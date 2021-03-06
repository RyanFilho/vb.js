var value = 'Class Program\n'
value += '    Sub Main(args As String())\n'
value += '        Console.WriteLine("aaa")\n'
value += '    End Sub\n'
value += 'End Class\n'
'Class Program\n    Sub Main(args As String())\n        Console.WriteLine("aaa")\n    End Sub\nEnd Class\n'
var 
    isOperator      = c => /[+\-*\/\^%=(),]/.test(c),
    isDigit         = c => /[0-9]/.test(c),
    isQuotes        = c => c === "\"",
    isWhiteSpace    = c => /\s/.test(c),
    isTextFormat    = c => /\n|\t/.test(c),
    isReserved      = c => /(?:^|(?<= ))(Class|Sub|End|As|Dim)(?:(?= )|$)/.test(c) ,
    isIdentifier    = c => typeof c === "string" && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c) && !isReserved(c);

var lex = function(input){
    var tokens = [];
    input.split(/\r\n|\r|\n/g).map(function(value, line){
        lexline(value, line+1).map(token => tokens.push(token));        
    });
    return tokens;
}

var lexline = function (input, line) {
    var tokens = [], c, col = 0;
    var advance = function () { return c = input[++col]; };
    var addToken = function (type, value, line, col) {
        tokens.push({
            type: type,
            value: value,
            line: line,
            col: col,
        });
    };

    while (col < input.length) {
        c = input[col];
        if (isWhiteSpace(c)) advance();
        else if (isOperator(c)) {
            addToken("operator", c, line, col+1);
            advance();
        } else if (isDigit(c)) {
            var num = c;
            while (isDigit(advance())) num += c;
            if (c === ".") {
                do num += c; while (isDigit(advance()));
            }
            num = parseFloat(num);
            if (!isFinite(num)) 
                console.log("Número \"" + num + "\" não é muito grande ou muito pequeno para um inteiro de 64 bits. Linha:" + line + " Coluna:" + col+1);
            else 
                addToken("number", num, line, col+1);
        } else if (isQuotes(c)) {
            var str = c;            
            while (!isQuotes(advance()))
            {
                if (c === undefined){
                    console.log("Você esqueceu de fechar a string! Linha:" + line + " Coluna:" + col+1);
                    break;
                }
                else{
                    str += c;
                }
            }
            str += c;
            addToken("string", str, line, col+1);
            advance();
        }else if (isIdentifier(c)) {
            var idn = c;
            while (isIdentifier(advance()) || isDigit(c)) idn += c;
            if (isReserved(idn)) {
                addToken("reserved", idn, line, col+1);
            } else {
                addToken("identifier", idn, line, col+1);
            }            
        } else console.log("Token não identificado \""+ c + "\". Linha:" + line + " Coluna:" + col+1); 
    }         
    return tokens;   
};
console.log(lex(value))
