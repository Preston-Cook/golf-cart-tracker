import prisma from "../../../lib/db";
import formatPhoneNumber from "../../../lib/formatPhoneNumber";

export default async function Table() {
  const logs = await prisma.log.findMany();

  return (
    <div className="relative overflow-x-auto mt-8 w-[92%] mx-auto rounded-xl border-2 border-white">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-[#5A3E2B] uppercase bg-[#77C7AE]">
          <tr>
            <th scope="col" className="text-sm px-3 py-3">
              Name
            </th>
            <th scope="col" className="text-sm px-3 py-3">
              Phone
            </th>
            <th scope="col" className="text-sm px-3 py-3">
              Golf Cart
            </th>
            <th scope="col" className="text-sm px-3 py-3">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <>
                <tr key={log.id} className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                  >
                    {log.firstName} {log.lastName}
                  </th>
                  <td className="px-3 text-left">
                    {formatPhoneNumber(log.phone)}
                  </td>
                  <td className="px-3 text-left">{log.golfCart}</td>
                  <td className="px-3 text-left">
                    {log.createdAt.toDateString()}
                  </td>
                </tr>
              </>
            ))
          ) : (
            <tr className="bg-white">
              <td className="px-3 text-left">Be</td>
              <td className="px-3 text-left">the</td>
              <td className="px-3 text-left">first</td>
              <td className="px-3 text-left">:)</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
