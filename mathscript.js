var sketchProc = function(processingInstance) {
     
with (processingInstance) {
        
size(400, 400); 
        
frameRate(30);
        
        
// WRITE YOUR PROGRAM CODE HERE  
strokeWeight(3);
var posX;
var posY;
var Ssize = 400;
var MathScript = [];
var RawScript = [];
var charListAlphaLower = [
    "a","b","c","d","e","f","g",
    "h","i","j","k","l","m","n",
    "o","p","q","r","s","t","u",
    "v","w","x","y","z",
];
var charListAlphaHigher = [
    "A","B","C","D","E","F","G","H","I","J",
    "K","L","M","N","O","P","Q","R","S","T",
    "U","V","W","X","Y","Z"
];
var charListCalcId = [
    "+","-","*","/",
];
var charListNumerals = [
    "0","1","2","3","4","5","6","7","8","9","10"
]
var parser = function(command) {
    var comm = command;
    var Split = command.split(' ');
    if (command !== "") {
        // --, ->, <-, <>, = identified as a line / array / segment.
        if (Split[0] === "--") {
            return "-- " + Split[1];
        } else if (Split[0] === "<-") {
            return "<- " + Split[1];
        } else if (Split[0] === "->") {
            return "-> " + Split[1];
        } else if (Split[0] === "<>") {
            return "<> " + Split[1];
        }
      if (charListAlphaLower.indexOf(Split[0].charAt(0)) !== -1) {
        // identified as variable or function

        if (Split[0].charAt(Split[0].length - 1) === ")") {
            // identified as a function
        } else if (Split[0] === "if") {
        // identified as an if statement
        return "if";
        } else if (Split[0] === "plane") {
            // identified as a plane
        return Split[0] + ' ' + Split[1];
        } else if (Split[0] === "square") {
            // identified as a square
            if (Split[1].length === 4) {
            return "square" + ' ' + Split[1];
            }
        } else if (Split[0] === "triangle") {
            // identified as a triangle
            if (Split[1].length === 3) {
            return "triangle" + ' ' + Split[1];
            }
        } else {
            // identified as a variable
            return 'variable ' + Split[0] + ' ' + Split[2];
        }
        
      } else if (charListAlphaHigher.indexOf(comm.charAt(0)) !== -1) {
          // identified as a point
          var splitS = comm.split('(').join(',').split(')');
          var splitT = splitS[0].split(',');
          return 'point ' + splitT[0] + ' ' + splitT[1] + ' ' + splitT[2];
          
          // var param = splitS[1].split(',');
          // return 'point ' + splitS[0] + ' ' + param[0] + ' ' + param[1];
          
      } else {
          // unidentified command
          return "null";
      }
    } else {
        return "";
    }
    /*
    for(var i = 0; i < line.length; i++) {
        if (charListAlphabet.indexOf(i) !==  -1) {
            
        }
    }
    */
};

var find = function(snip) {
    var i2 = "";
    for(var i = 0; i < RawScript.length; i++) {
        var split2 = RawScript[i].split(' ');
        if (snip.split(' ')[0] === split2[0] && snip.split(' ')[1] === split2[1]) {
            i2 = i;
        }
    }
    if (i2 === "") {
        return "undefined";
    } else {
        return i2;
    }
};

var calc = function(code) {
    var split = code.split(' ');
    var vals = [];

    var num1;
    var num2;

    if (charListNumerals.indexOf(split[0].charAt(0)) != -1) {
        // number
        num1 = parseInt(split[0])
    } else if (charListAlphaLower.indexOf(split[0].charAt(0)) != -1) {
        // variable or function
        num1 = parseInt(RawScript[find("variable " + split[0])].split(' ')[2]);
        console.log(find("variable " + split[0]));
    }

    for (var i = 0; i+2 < split.length; i++) {
        
        if (charListCalcId.indexOf(split[i + 1].charAt(0)) != -1) {

            if (charListNumerals.indexOf(split[i+2].charAt(0)) != -1) {
                // number
                num2 = parseInt(split[i+2])
            } else if (charListAlphaLower.indexOf(split[i].charAt(0)) != -1) {
                // variable or function
                num2 = parseInt(RawScript[find("variable " + split[0])].split(' ')[2]);
                console.log(num1);
            }

            
            var val;
            if (split[i + 1] === '+') {
                val = num1 + num2;
            }
            if (split[i + 1] === '-') {
                val = num1 - num2;
            }
            if (split[i + 1] === '*') {
                val = num1 * num2;
            }
            if (split[i + 1] === '/') {
                val = num1 / num2;
            }
            num1 = val
        }
    }
    return num1;
};

var add = function(code) { 
  var raw = parser(code);
  var rawList = raw.split(' ');
  var tempLength = RawScript.length;
  var found = find(raw);
  if (raw.split(' ')[0] === "triangle") {
      for(var i3 = 0; i3 < 3; i3++) {
          if (find("point " + raw.split(' ')[1].charAt(i3)) === 'undefined') {
      RawScript[i3 + tempLength] = 'point ' + raw.split(' ')[1].charAt(i3) + " " + 0 + " " + 0;}
      }
      RawScript[RawScript.length] = raw;
  } else if (raw.split(' ')[0] === "square") {
      for(var i3 = 0; i3 < 4; i3++) {
          // println(find("point " + raw.split(' ')[1].charAt(i3)));
          if (find("point " + raw.split(' ')[1].charAt(i3)) === 'undefined') {
      // println('point ' + raw.split(' ')[1].charAt(i3) + " " + 0 + " " + 0);
      RawScript[i3 + tempLength] = 'point ' + raw.split(' ')[1].charAt(i3) + " " + 0 + " " + 0;}
      }
      RawScript[RawScript.length] = raw;
  } else if (rawList[0] === "point") {
      if (found === 'undefined') {
      RawScript[RawScript.length] = raw;
      } else {
          RawScript[found] = raw;
      }
  } else if (rawList[0] === "<>" || rawList[0] === "->" || rawList[0] === "--") {
      RawScript[RawScript.length] = raw;
  } else {
      RawScript[RawScript.length] = raw;
  }
  
  
};
var del = function(ref) {
    var res = find(ref);
    RawScript[res] = '';
};
var getSlopeChange = function(p1x,p1y,p2x,p2y) {
    var xc = abs(p1x - p2x);
    var yc = abs(p1y - p2y);
    var listc = [xc,yc];
    return listc;
};
var getSlope = function(xc,yc) {
    return yc / xc;
};
var draw = function() {
     background(255, 255, 255);
     for (var i = 0; i < RawScript.length; i++) {
         var split = RawScript[i].split(' ');
         if (split[0] === "point") {
             point(split[2],split[3]);
         }
         if (split[0] === "triangle") {
             fill(196, 196, 196);
             var p1 = find('point ' + split[1].charAt(0));
             var p2 = find('point ' + split[1].charAt(1));
             var p3 = find('point ' + split[1].charAt(2));
             var p1x = RawScript[p1].split(' ')[2];
             var p1y = RawScript[p1].split(' ')[3];
             var p2x = RawScript[p2].split(' ')[2];
             var p2y = RawScript[p2].split(' ')[3];
             var p3x = RawScript[p3].split(' ')[2];
             var p3y = RawScript[p3].split(' ')[3];
             triangle(p1x,p1y,p2x,p2y,p3x,p3y);
         }
         if (split[0] === "square") {
             fill(196, 196, 196);
             var p1 = find('point ' + split[1].charAt(0));
             var p2 = find('point ' + split[1].charAt(1));
             var p3 = find('point ' + split[1].charAt(2));
             var p4 = find('point ' + split[1].charAt(3));
             var p1x = RawScript[p1].split(' ')[2];
             var p1y = RawScript[p1].split(' ')[3];
             var p2x = RawScript[p2].split(' ')[2];
             var p2y = RawScript[p2].split(' ')[3];
             var p3x = RawScript[p3].split(' ')[2];
             var p3y = RawScript[p3].split(' ')[3];
             var p4x = RawScript[p4].split(' ')[2];
             var p4y = RawScript[p4].split(' ')[3];
             quad(p1x,p1y,p2x,p2y,p3x,p3y,p4x,p4y);
         }
         if (split[0] === "--") {
             var p1 = find('point ' + split[1].charAt(0));
             var p2 = find('point ' + split[1].charAt(1));
             var p1x = RawScript[p1].split(' ')[2];
             var p1y = RawScript[p1].split(' ')[3];
             var p2x = RawScript[p2].split(' ')[2];
             var p2y = RawScript[p2].split(' ')[3];
             line(p1x,p1y,p2x,p2y);
         }
         
         
         
     }
};


add('A(0,0)');
add('B(300,100)');
add('C(0,100)');
add('triangle ABC');
add('x = 10');
console.log(RawScript);
console.log(find("variable x"))
console.log(calc('x * 10 + 20'));

//YOUR JS PROGRAM CODE ENDS HERE.
}};  
// Get the canvas that Processing-js will use
    
var canvas = document.getElementById("mycanvas"); 
  
  // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    
var processingInstance = new Processing(canvas, sketchProc); 