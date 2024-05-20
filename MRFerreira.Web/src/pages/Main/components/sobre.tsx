export default function Sobre() {
  return (
    <div className="px-8 lg:px-20 py-12 mx-auto" id="sobre">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Sobre nossa empresa
        </h1>
        <p className="text-md text-center mt-3 text-gray-600">
          Conheça mais sobre a MRFerreira
        </p>
      </div>
      <div className="grid grid-cols-12 mt-8">
        <div className="col-span-12 lg:col-span-6">
          <div className="flex items-center justify-center">
            <img
              src="/images/logo-transparente.png"
              className="h-[400px] lg:-ms-12"
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 px-14 py-16 break-words">
          <h2 className="text-2xl font-semibold">Conheça nossa história!</h2>
          <p className="text-lg mt-5">
            Fundada em 21 de dezembro de 2007 na cidade de Jaú/SP, a MR Ferreira
            Representações completa este ano a maioridade! São 18 anos de lutas
            e desafios, mas também de muitas conquistas e vitórias! Somos uma
            empresa de representação comercial que atua exclusivamente junto a
            lojistas, atacadistas e distribuidores de móveis para escritório em
            geral em todo o interior de São Paulo, algumas regiões da capital e
            litoral, além de alguns outros estados como Minas Gerais, Espírito
            Santo, Pará e todos os estados do Nordeste. Trabalhamos com as
            melhores empresas do Brasil no seguimento e estamos sempre abertos a
            novas parcerias! Nossa missão é encantar o cliente e nosso
            diferencial é mantê-lo encantado!
          </p>
        </div>
      </div>
    </div>
  );
}
