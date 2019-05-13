const pdfsig = require('pdfsig');

(async () => {
  try {
    const firmas = new pdfsig('./prueba.pdf');
    for (let i = 0; i < firmas.size(); i++) {
      console.log(`Signature #${i + 1}`);
      console.log(`  - Nombre del signatario: ${firmas.atributo(i, 'CN')}`);
      console.log(`  - País: ${firmas.atributoByOid(i, '2.5.4.6')}`);
      console.log(`  - Fecha firma: ${firmas.fecha(i)}`);
      console.log(`  - Estado firma: ${firmas.estado(i)}`);
      console.log(`  - Certificado:`);
      console.log(`    - Validez: ${firmas.validez(i).notBefore} - ${firmas.validez(i).notAfter}`);
      console.log(`    - PKI: ${firmas.pki(i)}`);
      console.log(`    - OCSP: ${(await firmas.ocsp(i)).type}`);
    }
  } catch (ex) {
    console.log(ex.message);
  }
})();
