import PDFDocument from "pdfkit";

export const generateServicePdf = async (service, res) => {
  const doc = new PDFDocument({
    margin: 50,
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader("Content-Disposition", `inline; filename=${service.code}.pdf`);

  doc.pipe(res);

  // HEADER

  doc.fontSize(20).text("ORDEN DE SERVICIO", {
    align: "center",
  });

  doc.moveDown();

  doc.fontSize(12).text(`Código: ${service.code}`);

  doc.text(`Estado: ${service.status}`);

  doc.text(`Fecha: ${new Date(service.createdAt).toLocaleDateString()}`);

  doc.moveDown();

  // CLIENTE

  doc.fontSize(16).text("CLIENTE");

  doc.fontSize(12).text(`Nombre: ${service.customer.name}`);

  doc.text(`Teléfono: ${service.customer.phone || "-"}`);

  doc.text(`Email: ${service.customer.email || "-"}`);

  doc.moveDown();

  // DESCRIPCIÓN

  doc.fontSize(16).text("DESCRIPCIÓN");

  doc.fontSize(12).text(service.description || "-");

  doc.moveDown();

  // FORM DATA

  doc.fontSize(16).text("DATOS DEL EQUIPO");

  doc.moveDown(0.5);

  if (service.formData) {
    service.formData.forEach((value, key) => {
      doc.text(`${key}: ${value}`);
    });
  }

  doc.moveDown();

  // OBSERVACIONES

  doc.fontSize(16).text("OBSERVACIONES");

  doc.moveDown(0.5);

  service.observations.forEach((observation) => {
    doc.text(`• ${observation.text}`);
  });

  doc.moveDown(2);

  doc.text("Firma Cliente: __________________");

  doc.moveDown();

  doc.text("Firma Técnico: _________________");

  doc.end();
};
