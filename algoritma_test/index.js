//soal 1
//Reverse string dengan angka tetap di akhir:
// Input: "NEGIE1"
// Output: "EIGEN1"
function reverseStringOnly(input) {
    const reverseString = input.slice(0, -1).split('').reverse().join('') + input.slice(-1)
    console.log(reverseString)
}

reverseStringOnly("NEIGE1")




//Soal 2
// Kata terpanjang dalam kalimat:
// Input: "Saya sangat senang mengerjakan soal algoritma"
// Output: "mengerjakan" (panjang: 11 karakter)

function longestWord(input) {
    const words = input.split(' ')
    let longest = ''

    for (const word of words) {
        if (word.length > longest.length) {
            longest = word
        }
    }

    console.log(`${longest} (panjang: ${longest.length} karakter)`);
}
longestWord("Saya sangat senang mengerjakan soal algoritma")




//Soal 3
// Kemunculan kata dalam array QUERY? (mungkin) pada array INPUT:
// INPUT = ['xc', 'dz', 'bbb', 'dz']
// QUERY = ['bbb', 'ac', 'dz']
// Output: [1, 0, 2]
function func3(input, query) {
    console.log(query.map(q => input.filter(word => word === q).length))
}

func3(
    ['xc', 'dz', 'bbb', 'dz'],
    ['bbb', 'ac', 'dz']
)



//Soal 4
// Pengurangan jumlah diagonal matriks NxN:
// Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
// Output: 3

function reduceDiagonalMatrix(matrix) {
    let numA = 0
    let numB = 0
    for (let i = 0; i < matrix.length; i++) {
        numA += matrix[i][i]
        numB += matrix[i][matrix.length - 1 - i]
    }
    const result = numA - numB
    console.log(result);
}

reduceDiagonalMatrix([[1, 2, 0], [4, 5, 6], [7, 8, 9]])
