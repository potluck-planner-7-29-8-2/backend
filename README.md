# backend

Backend for Potluck Planner

Heroku logs:
npx heroku logs --tail -a potluck-planner-bw

Heroku reset:

npx heroku restart -a potluck-planner-bw && npx heroku pg:reset DATABASE -a potluck-planner-bw && npx heroku knex migrate:latest -a potluck-planner-bw
