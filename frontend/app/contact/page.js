"use client";
import { useForm } from "react-hook-form";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Will connect to API later
    alert("Message sent successfully!");
  };

  return (
    <div>
      <section className="bg-primary py-20 pt-24 text-white text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-white/90">
          Got questions or inquiries? Drop us a message below.
        </p>
      </section>

      <section className="py-16 container mx-auto px-6 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="premium-card p-8">
          <div className="mb-4">
            <label className="block mb-1 font-medium text-accent">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-accent">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium text-accent">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full p-3 border border-gray-300 rounded-md h-32"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
