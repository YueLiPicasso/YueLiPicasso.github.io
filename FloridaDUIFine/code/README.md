# Fine Calculator for Florida DUI Offenses

The calculator computes maximum and minimum fine for a DUI offense in Florida. 

## How to use

Specify the parameters in [test.catala_en](./test.catala_en) and then `make`. The full list of parameters is given in [Florida_DUI_2022.catala_en](./Florida_DUI_2022.catala_en).

## Note on Formalization

Criminal law formalization, as exemplified by this DUI fine calculator project, is not a matter of simple symbolic transformation. Human understanding of the statutes is important for the job to be done. For instance, the formalization distinguishes two types of fines: fine based on prior record and fine based on damage. Such a distinction is not made by the statutes, but is the Catala programmer's response to the ambiguity of the statutes, which we explain now. Say the instant DUI offence is a fourth conviction, and also causes damage to property. A fourth DUI is on the one hand a 3rd degree felony with fine $ 2,000 ~ $ 5,000, where the minimum of $ 2,000 is according to (2)(b)3. which is specific to a fourth DUI offence, and the maximum of $ 5,000 is according to 775.083(1)(c) which is uniform for all 3rd degree felonies; but since it also damages property, by (3)(c)1. it is a misdemeanour of the 1st degree, with a fine up to $ 1,000 according to 775.083(1)(d) which is uniform for all 1st degree misdemeanours. 

## Note on Catala-to-JavaScript Compilation

The above mentioned ambiguity in statutes, if left unresolved, results in runtime errors in the Catala code where multiple different definitions of the same variable simultaneously hold; this in turn causes runtime error in the JavaScript code. 

## Subtlety with JavaScript Floating Point Numbers

A blood-alcohol concentration (BAC) of 0.15 or above is an aggravating factor in a DUI offence. Catala can handle the number correctly; however, when working with JavaScript compiled from Catala, and providing a BAC of 0.15 as input, the comparison between the _input_ 0.15 and the _internal_ 0.15 benchmark somehow incorrectly treats the input 0.15 as if it is less than 0.15.

Given that some decimal numbers have no exact floating point representation, and 0.15 is such a number, as demonstrated by running the following JS code using [W3Schools](https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_tofixed) online tool:
```javascript
let num = 0.15;
let n = num.toFixed(50);
```
I resolved the issue in the following manner: a user input of 0.15 is silently increased by the Web-UI to 0.15000000000000001 before being passed to the JavaScript (compiled from Catala) so that the aggravating factor can be correctly activated. 

Catala's OCaml runtime uses `decimal_of_string` and the `decimal` type is implemented as `Q.t`; I cannot find a definition for `Q` and I cannot further trace the bug.



