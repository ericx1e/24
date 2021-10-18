//pain 

function checkPossible() {
    let numbers = [];
    cards.forEach(card => {
        numbers.push(card.n);
    });

    permutations = permutator(numbers);
    // operations = permutator([0,1,2,3]);
    let works = false;
    let workingP = [];
    let workingI = [];
    let workingA = [];
    let workingB = [];
    let workingC = [];
    permutations.forEach(p => {
        // result = 0;


        // let x = 0;

        for (let i = 0; i < 5; i++) { //order of parathases
            for (let a = 0; a < 4; a++) { //first operation
                for (let b = 0; b < 4; b++) { //second operation
                    for (let c = 0; c < 4; c++) { //third operation
                        let inner = 0;
                        let inner1 = 0;
                        let result = 0;
                        switch (i) {
                            case 0:
                                switch (c) {
                                    case 0:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 + p[2];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 - p[2];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 * p[2];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 / p[2];
                                                break;
                                        }
                                        result = inner + p[3];
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                            // console.log(p, i, a, b, c);
                                            // console.log(inner1);
                                            // console.log(inner);
                                            // console.log(result);
                                        }
                                        break;
                                    case 1:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 + p[2];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 - p[2];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 * p[2];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 / p[2];
                                                break;
                                        }
                                        result = inner - p[3];
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 2:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 + p[2];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 - p[2];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 * p[2];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 / p[2];
                                                break;
                                        }
                                        result = inner * p[3];
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 3:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 + p[2];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 - p[2];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 * p[2];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = inner1 / p[2];
                                                break;
                                        }
                                        result = inner / p[3];
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                }

                                break;
                            case 1:
                                switch (c) {
                                    case 0:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] + inner1;
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] - inner1;
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] * inner1;
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] / inner1;
                                                break;
                                        }
                                        result = inner + p[3];
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 1:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] + inner1;
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] - inner1;
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] * inner1;
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] / inner1;
                                                break;
                                        }
                                        result = inner - p[3];
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 2:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] + inner1;
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] - inner1;
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] * inner1;
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] / inner1;
                                                break;
                                        }
                                        result = inner * p[3];
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 3:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] + inner1;
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] - inner1;
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] * inner1;
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = p[0] / inner1;
                                                break;
                                        }
                                        result = inner / p[3];
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                }
                                break;
                            case 2:
                                switch (c) {
                                    case 0:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] + inner1;
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] - inner1;
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] * inner1;
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] / inner1;
                                                break;
                                        }
                                        result = p[0] + inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 1:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] + inner1;
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] - inner1;
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] * inner1;
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] / inner1;
                                                break;
                                        }
                                        result = p[0] - inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 2:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] + inner1;
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] - inner1;
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] * inner1;
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] / inner1;
                                                break;
                                        }
                                        result = p[0] * inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        } break;
                                    case 3:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] + inner1;
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] - inner1;
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] * inner1;
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[2] + p[3];
                                                        break;
                                                    case 1:
                                                        inner1 = p[2] - p[3];
                                                        break;
                                                    case 2:
                                                        inner1 = p[2] * p[3];
                                                        break;
                                                    case 3:
                                                        inner1 = p[2] / p[3];
                                                        break;
                                                }
                                                inner = p[1] / inner1;
                                                break;
                                        }
                                        result = p[0] / inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                }
                                break;
                            case 3:
                                switch (c) {
                                    case 0:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 + p[3];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 - p[3];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 * p[3];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 / p[3];
                                                break;
                                        }
                                        result = p[0] + inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 1:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 + p[3];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 - p[3];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 * p[3];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 / p[3];
                                                break;
                                        }
                                        result = p[0] - inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 2:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 + p[3];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 - p[3];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 * p[3];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 / p[3];
                                                break;
                                        }
                                        result = p[0] * inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 3:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 + p[3];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 - p[3];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 * p[3];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[1] + p[2];
                                                        break;
                                                    case 1:
                                                        inner1 = p[1] - p[2];
                                                        break;
                                                    case 2:
                                                        inner1 = p[1] * p[2];
                                                        break;
                                                    case 3:
                                                        inner1 = p[1] / p[2];
                                                        break;
                                                }
                                                inner = inner1 / p[3];
                                                break;
                                        }
                                        result = p[0] / inner;
                                        //if(result == 24) return true
                                        break;
                                }
                                break;
                            case 4:

                                switch (c) {
                                    case 0:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] + p[3];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] - p[3];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] * p[3];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] / p[3];
                                                break;
                                        }
                                        result = inner1 + inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 1:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] + p[3];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] - p[3];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] * p[3];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] / p[3];
                                                break;
                                        }
                                        result = inner1 - inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 2:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] + p[3];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] - p[3];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] * p[3];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] / p[3];
                                                break;
                                        }
                                        result = inner1 * inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                    case 3:
                                        switch (b) {
                                            case 0:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] + p[3];
                                                break;
                                            case 1:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] - p[3];
                                                break;
                                            case 2:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] * p[3];
                                                break;
                                            case 3:
                                                switch (a) {
                                                    case 0:
                                                        inner1 = p[0] + p[1];
                                                        break;
                                                    case 1:
                                                        inner1 = p[0] - p[1];
                                                        break;
                                                    case 2:
                                                        inner1 = p[0] * p[1];
                                                        break;
                                                    case 3:
                                                        inner1 = p[0] / p[1];
                                                        break;
                                                }
                                                inner = p[2] / p[3];
                                                break;
                                        }
                                        result = inner1 / inner;
                                        if (result == 24) {
                                            works = true;
                                            workingP.push(p);
                                            workingI.push(i);
                                            workingA.push(a);
                                            workingB.push(b);
                                            workingC.push(c);
                                        }
                                        break;
                                }
                                break;
                        }

                    }
                }
            }
        }
    });

    for (let i = 0; i < workingP.length; i++) {
        // console.log(workingP[i], workingI[i], workingA[i], workingB[i], workingC[i]);
        // if (equationString(workingP[i], workingI[i], workingA[i], workingB[i], workingC[i]) == equationString(workingP[i + 1], workingI[i + 1], workingA[i + 1], workingB[i + 1], workingC[i + 1])) {
        console.log(equationString(workingP[i], workingI[i], workingA[i], workingB[i], workingC[i]));
        // }
    }

    if(works) {
        return workingP.length;
    }
    return 0;
}

function equationString(p, i, a, b, c) {
    result = "";
    switch (i) {
        case 0:
            result = "((";
            break;
        case 1:
            result = "(";
            break;
        case 4:
            result = "(";
            break;
    }

    result += p[0];

    switch (i) {
        case 0:
            result += getOperation(a);
            break;
        case 1:
            result += getOperation(b);
            break;
        case 2:
            result += getOperation(c);
            break;
        case 3:
            result += getOperation(c);
            break;
        case 4:
            result += getOperation(a);
            break;
    }

    switch (i) {
        case 1:
            result += "(";
            break;
        case 2:
            result += "(";
            break;
        case 3:
            result += "((";
            break;
    }

    result += p[1];

    switch (i) {
        case 0:
            result += ")";
            break;
        case 4:
            result += ")";
            break;
    }

    switch (i) {
        case 0:
            result += getOperation(b);
            break;
        case 1:
            result += getOperation(a);
            break;
        case 2:
            result += getOperation(b) + "(";
            break;
        case 3:
            result += getOperation(a);
            break;
        case 4:
            result += getOperation(c) + "(";
            break;
    }

    result += p[2];

    switch (i) {
        case 0:
            result += ")";
            break;
        case 1:
            result += "))";
            break;
        case 3:
            result += ")";
            break;
    }

    switch (i) {
        case 0:
            result += getOperation(c);
            break;
        case 1:
            result += getOperation(c);
            break;
        case 2:
            result += getOperation(a);
            break;
        case 3:
            result += getOperation(b);
            break;
        case 4:
            result += getOperation(b);
            break;
    }

    result += p[3];

    switch (i) {
        case 2:
            result += "))";
            break;
        case 3:
            result += ")";
            break;
        case 4:
            result += ")";
            break;
    }

    return result;
}

function getOperation(n) {
    result = "";
    switch (n) {
        case 0:
            result += "+";
            break;
        case 1:
            result += "-";
            break;
        case 2:
            result += "*";
            break;
        case 3:
            result += "/";
            break;
    }
    return result;
}