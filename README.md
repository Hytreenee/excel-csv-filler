# Excel/Csv filler (number ranges)

## Table of Contents

- [About](#about)
- [Usage](#usage)

## About <a name = "about"></a>

The main purpose of this project is to prepare files with columns of number ranges for later data-matrix codes creation.
Did for myself, one time task, not sure if anyone would find useful, but still.

You give it range of numbers Start-End and amount of filled lines each file should have.
Then it processes numbers in the way that it fits into print pages, which are in my case 13x14 (13 threads x 14 columns)
After that adds calculated amount of empty lines before every thread so file has marks for guys doing the printing (where to cut).
If final amount doesn't fit it adds nulls (00000000) to the end up until it divides by 13 and 14.
Playing with lines per file amount can help find most optimal option paper-wise.

## Usage <a name = "usage"></a>

Dev

```yarn start```

Production

```yarn start-prod-linux```

Or

```docker-compose up --build```
 
