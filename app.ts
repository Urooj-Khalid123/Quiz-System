#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";

console.log("Wellcome to `CodeWithUrooj` Quiz System");
console.log("-".repeat(50));
let apiLink =
  "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";

let fetchData = async (data: string) => {
  let fetchQuiz: any = await fetch(data);
  let res = await fetchQuiz.json();
  return res.results;
};

let data = await fetchData(apiLink);

let startQuiz = async () => {
  let score: number = 0;
  //for user Name :
  let userName = await inquirer.prompt({
    name: "name",
    message: "What is Your Name ?",
    type: "input",
  });

  for (let i = 1; i <= 5; i++) {
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];

    let ans = await inquirer.prompt({
      name: "quiz",
      message: data[i].question,
      type: "list",
      choices: answers.map((val: any) => val),
    });

    if (ans.quiz == data[i].correct_answer) {
      ++score;
      console.log(chalk.bold.italic.yellowBright("Correct"));
       } else {
        console.log(`Correct Answer is ${chalk.bold.italic.greenBright(data[i].correct_answer)}`);
        
       }
  }

  console.log(
    `Dear ${chalk.yellowBright.bold(
      userName.name
    )}, Your Score is ${chalk.redBright.bold(
      score
    )}, Out of ${chalk.redBright.bold("5")}`
  );
};

startQuiz();
