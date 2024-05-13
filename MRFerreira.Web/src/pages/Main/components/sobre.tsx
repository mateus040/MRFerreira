export default function Sobre() {
  return (
    <div className="px-8 lg:px-20 py-12 mx-auto">
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
            <img src="/images/logo-transparente.png" className="h-[400px] lg:-ms-12" />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 px-14 py-16 break-words">
          <h2 className="text-2xl font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p className="text-lg mt-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic
            voluptatem nihil voluptates cumque quidem molestias. Nihil cumque
            tempore nulla pariatur! Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Hic voluptatem nihil voluptates cumque quidem
            molestias. Nihil cumque tempore nulla pariatur!
          </p>
        </div>
      </div>
    </div>
  );
}
