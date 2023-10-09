import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  process.env.DB_URI as string,
  neo4j.auth.basic(
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string
  )
);

export { driver };
