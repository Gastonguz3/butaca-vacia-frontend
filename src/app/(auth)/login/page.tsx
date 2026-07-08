"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [seePassword, setSeePassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await login(data);

      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col min-h-[70vh] items-center justify-center bg-linear-to-tr from-black via-amber-900 to-yellow-700 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold">
        ¡Bienvenido de Nuevo!
      </h1>

      <p className="mt-3 text-gray-300 font-semibold text-center px-4">
        Tu butaca te estaba esperando, toma asiento y descubrí qué ver este día.
      </p>

      <div className="rounded-lg border-black bg-white/20 w-[90%] md:w-[70%] lg:w-[40%] mt-5 px-3 py-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}

          <label className="font-medium text-gray-200">Email</label>

          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              name="email"
              type="email"
              placeholder="tuemail@gmail.com"
              value={data.email}
              onChange={handleChange}
              className="flex bg-black/20 pl-10 pr-3 py-2 w-full mt-2 rounded-md focus:outline-none"
            />
          </div>

          {/* Contraseña */}

          <label className="font-medium text-gray-200">Contraseña</label>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              name="password"
              type={seePassword ? "text" : "password"}
              placeholder="********"
              value={data.password}
              onChange={handleChange}
              className="flex bg-black/20 pl-10 pr-10 py-2 w-full mt-2 rounded-md focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {seePassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Boton */}

          <div className="flex justify-center">
            <button
              disabled={loading}
              type="submit"
              className="w-full md:w-1/2 rounded-full bg-yellow-600 py-2 font-semibold mt-3 hover:scale-110 hover:bg-yellow-500 transition duration-300 disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </div>
        </form>

        <div className="flex mt-6 gap-1 text-sm md:text-base justify-end">
          <p>¿No tenés cuenta?</p>

          <Link
            href="/register"
            className="font-semibold hover:text-yellow-400"
          >
            Registrate
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
