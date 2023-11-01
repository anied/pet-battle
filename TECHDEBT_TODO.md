# Techdebt TODO

## Overview

A list of all potential techdebt items that need review and potential remediation.

## The list

- Sequelize audit: Sequelize was originally intended as the primary ORM before TypeORM was adopted instead.  As such, the Sequelize library and any peer dependencies can and should probably be moved out of `dependencies` and into `devDependencies`
- Refactor and consolidate env vars to use a saner strategy
- Create a config module to manage env vars and store and serve config such as table names, etc