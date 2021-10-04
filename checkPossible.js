//pain 

function checkPossible() {
    let numbers = [];
    cards.forEach(card => {
        numbers.push(card.n);
    });

    permutations = permutator(numbers);
    // operations = permutator([0,1,2,3]);
    let works = false;
    permutations.forEach(p => {
        // result = 0;


        // let x = 0;

        for(let i = 0; i < 5; i++) { //order of parathases
            for(let a = 0; a < 4; a++) { //first operation
                for(let b = 0; b < 4; b++) { //second operation
                    for(let c = 0; c < 4; c++) { //third operation
                        let inner = 0;
                        let inner1 = 0;
                        let result = 0;
                        switch(i) {
                            case 0:
                                switch(c) {
                                    case 0:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 1:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 2:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 3:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                }

                            case 1:
                                switch(c) {
                                    case 0:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 1:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 2:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 3:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                }
                            case 2:
                                switch(c) {
                                    case 0:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 1:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 2:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;break;
                                    case 3:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                }
                            case 3:
                                switch(c) {
                                    case 0:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 1:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 2:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 3:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                            case 4:
                                
                                switch(c) {
                                    case 0:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 1:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 2:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                    case 3:
                                        switch(b) {
                                            case 0:
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                                switch(a) {
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
                                    if(result == 24) works = true;
                                    break;
                                }
                        }
                        
                    }
                }
            }
        }
    });

    return works;
}
