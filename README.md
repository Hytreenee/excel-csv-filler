# Excel/Csv filler (number ranges)

## Table of Contents

-   [About](#about)
-   [Usage](#usage)

## About <a name = "about"></a>

The main purpose of this project is to prepare files with columns of number ranges for later barcodes creation.
Made for myself, one time task, not sure if anyone would find useful, but still.

You give it a range of numbers Start-End and amount of codes each file should have.
Then it processes numbers in the way that it fits into print pages, which are in my case 13x14 (13 threads x 14 columns). 
After that it adds calculated amount of empty lines before every chunk of codes so file has marks for guys doing the printing (where to cut).
If final amount doesn't fit it adds nulls (00000000) to the end up until it fits well into last page.
Playing with lines per file amount can help find most optimal solution paper-wise.

![Choices](https://github.com/SanariSan/excel-csv-filler/blob/master/assets/1.png?raw=true)
![Info before process](https://github.com/SanariSan/excel-csv-filler/blob/master/assets/2.png?raw=true)
![Result](https://github.com/SanariSan/excel-csv-filler/blob/master/assets/3.png?raw=true)


## Usage <a name = "usage"></a>

Dev (main)

`yarn start`

Production

`yarn start-prod-linux`

Or

`docker-compose up --build`
