#!/usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';

const runCommand = command => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
    return true;
  } catch (err) {
    console.error(`Failed to execude ${command}`, err);
    return false;
  }
};

const projectName = process.argv[2];
if (projectName !== undefined) {
  const gitCheckoutCommand = `git clone --depth 1 https://github.com/Almatov-Nurs/create-parsing-afl-app.git ${projectName}`;
  const installCommand = projectName === '.' ? 'npm install' : `cd ${projectName} && npm install`;
  
  console.log(`Создается образ приложения ${projectName === '.' ? '' : projectName}`);
  const checkedOut = runCommand(gitCheckoutCommand);
  if (!checkedOut) process.exit(-1);
  
  console.log(`Установка зависимостей для проекта ${projectName}`);
  const installedDeps = runCommand(installCommand);
  if (!installedDeps) process.exit(-1);
  
  console.log('\n\nПриложение успешно установлено, можете запустить команду:\n');
  if (projectName !== '.') console.log(`  cd ${projectName}`);
  console.log(`  ${chalk.green('npm start')}`);
} else {
  console.log('\nНадо ввести название проекта:');
  console.log(`   ${chalk.cyan('npx create-parsing-afl-app')} ${chalk.green('<project_name>')}\n`);
  console.log('Или если хотите установить на текущую директорию, выполните комманду:');
  console.log(`   ${chalk.cyan('npx create-parsing-afl-app')} ${chalk.green('.')}\n`);
  console.log(`Выполните команду ${chalk.cyan('npx create-parsing-afl-app')} заново!`);
}
