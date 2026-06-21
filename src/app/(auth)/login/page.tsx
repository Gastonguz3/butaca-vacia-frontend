"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

const page = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  return (
    <section className="flex flex-col min-h-[70vh] items-center justify-center bg-linear-to-tr from-black via-amber-900 to-yellow-700 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold  ">
        ¡Bienvenido de Nuevo!
      </h1>
      <p className="mt-3 text-gray-300 font-semibold text-center px-4">
        Tu butaca te estaba esperando, toma asiento y descubrí qué ver esta dia
      </p>
      <div className="rounded-lg border-black bg-white/20 w-[90%] md:w-[70%] lg:w-[40%] mt-5 px-3 py-5 ">
        {/*Formulario */}
        <form action="" className="space-y-4">
          {/*Email */}
          <label className="font-medium text-gray-200">Email</label>
          <div className="relative">
            <FaUser className=" absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="tuemail@gmail.com"
              className="flex bg-black/20 pl-10 pr-3 py-1 w-full mt-2 focus:outline-none "
            />
          </div>
          {/*Email */}
          <label className="font-medium text-gray-200">Contraseña</label>
          <div className="relative">
            <FaLock className=" absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={seePassword ? "text" : "password"}
              placeholder="*********"
              className="flex bg-black/20 pl-10 pr-3 py-1 w-full mt-2 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {seePassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {/*Boton de envio */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-1/2 rounded-full bg-yellow-600 py-2 font-semibold mt-3 hover:scale-110 hover:bg-yellow-500 transition duration-300 cursor-pointer "
            >
              Ingresar
            </button>
          </div>
          {/* OR 
          <div className="flex items-center my-3">
            <div className="grow border-t "> </div>
            <span className="shrink mx-4">OR</span>
            <div className="grow border-t"></div>
          </div>*/}
        </form>
        <div className="flex mt-6 gap-1 text-sm md:text-base justify-end">
          <p>¿No tenes cuenta?</p>
          <Link
            href="/register"
            className="font-semibold hover:text-yellow-400 cursor-pointer"
          >
            Registrate
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
