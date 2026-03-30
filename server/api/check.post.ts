import prisma from "../lib/prisma";

export default eventHandler(async (event) => {
  const dataCheck = await readBody(event);

  try {
    const result = await prisma.informs.create({
      data: {
        date_inform: dataCheck.date_inform,
        time_in: dataCheck.time_in,
        time_out: dataCheck.time_out,
        lat: dataCheck.lat,
        lng: dataCheck.lng,
        comments: dataCheck.comments,
        failed_beds: dataCheck.failed_beds,
        failed_umbrellas: dataCheck.failed_umbrellas,
        failed_boats: dataCheck.failed_boats,
        failed_padel: dataCheck.failed_padel,
        sector_id: dataCheck.sector_id,
        inspector_id: dataCheck.inspector_id,
        collector_id: dataCheck.collector_id,
      },
    });

    return result;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al crear el informe",
    });
  }
});
