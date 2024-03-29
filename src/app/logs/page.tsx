import Table from "../components/Table";
import prisma from "../../../lib/db";

export const dynamic = "force-dynamic";

export default async function Logs() {
  const logs = await prisma.log.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <Table logs={logs} />;
}
