const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
})

new Sequelize(
    process.env.DATABASE_URL ||
    `postgresql://postgres:${encodeURIcomponent(process.env.PASS)}@localhost/pies`,
    {
    dialect: 'postgres',
    })


