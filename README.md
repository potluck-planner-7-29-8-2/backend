# Backend

Backend for Potluck Planner

Heroku logs:
npx heroku logs --tail -a potluck-planner-bw

Heroku DB reset and reseed:
npx heroku restart -a potluck-planner-bw && npx heroku pg:reset DATABASE --confirm potluck-planner-bw -a potluck-planner-bw && npx heroku run knex migrate:latest -a potluck-planner-bw

# Documentation

Please see: https://documenter.getpostman.com/view/8269848/SVYjVNdz?version=latest

# Dependencies

This server uses knex, knex-cleaner, bcryptjs, cors, dotenv, express, helmet, and JWT. The deployed server uses PostgreSQL and the local server uses SQLite3.
