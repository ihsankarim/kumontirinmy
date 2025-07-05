"use client";
import React, { useState, useEffect } from "react";
import {
  Car,
  Clock,
  MapPin,
  Phone,
  Star,
  Calendar,
  Users,
  Wrench,
  Shield,
  CheckCircle,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  // Testimonial data
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pemilik Toyota Avanza",
      rating: 5,
      text: "Pelayanan sangat memuaskan! Booking mudah dan montir profesional. Mobil saya kembali seperti baru.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Sari Wijaya",
      role: "Pemilik Honda Jazz",
      rating: 5,
      text: "Sistem booking online sangat memudahkan. Tidak perlu antri lama, langsung dilayani sesuai jadwal.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Ahmad Rizki",
      role: "Pemilik Suzuki Ertiga",
      rating: 5,
      text: "Harga transparan, kualitas kerja bagus. Sudah 3 kali service di sini, selalu puas!",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="animate-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Service Berkala",
      description: "Perawatan rutin untuk menjaga performa kendaraan Anda",
      price: "Mulai dari Rp 150.000",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Perbaikan Mesin",
      description: "Diagnosis dan perbaikan mesin dengan teknologi terkini",
      price: "Mulai dari Rp 300.000",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Body & Paint",
      description: "Perbaikan body dan cat untuk tampilan sempurna",
      price: "Mulai dari Rp 500.000",
    },
  ];

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Booking Online 24/7",
      description: "Reservasi kapan saja tanpa ribet",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Layanan Cepat",
      description: "Proses service yang efisien dan tepat waktu",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Montir Berpengalaman",
      description: "Tim ahli dengan sertifikat resmi",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Lokasi Strategis",
      description: "Mudah diakses dari berbagai area",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Bengkel Terpercaya dengan
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    {" "}
                    Booking Online
                  </span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Solusi lengkap perawatan kendaraan Anda dengan sistem booking
                  yang mudah, pelayanan profesional, dan harga transparan.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                  Book Service Sekarang
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                  Lihat Layanan
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-blue-200">Kendaraan Dilayani</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-blue-200">Montir Berpengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="text-blue-200">Rating Pelanggan</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=600&h=400&fit=crop"
                  alt="Bengkel Modern"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="font-semibold">Buka 24/7</div>
                <div className="text-sm text-blue-200">Siap Melayani</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="animate-services"
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["animate-services"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Layanan Unggulan Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dapatkan pelayanan terbaik untuk kendaraan Anda dengan teknologi
              modern dan tim montir berpengalaman
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible["animate-services"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-lg font-bold text-blue-600 mb-4">
                  {service.price}
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <span>Book Service</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop"
                alt="Modern Workshop"
                className="rounded-2xl shadow-xl"
              />
            </div>

            <div
              id="animate-features"
              className={`space-y-8 transition-all duration-1000 ${
                isVisible["animate-features"]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Mengapa Memilih Kumontirinmy?
                </h2>
                <p className="text-xl text-gray-600">
                  Kami memberikan pengalaman service yang berbeda dengan
                  teknologi booking online dan pelayanan yang profesional
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                      <div className="text-blue-600">{feature.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-semibold text-gray-900">
                    Garansi Service 6 Bulan
                  </span>
                </div>
                <p className="text-gray-600">
                  Kami berkomitmen pada kualitas dengan memberikan garansi untuk
                  setiap pekerjaan yang kami lakukan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Apa Kata Pelanggan Kami?
            </h2>
            <p className="text-xl text-blue-100">
              Kepuasan pelanggan adalah prioritas utama kami
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  )
                )}
              </div>

              <blockquote className="text-2xl font-medium mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="text-left">
                  <div className="font-semibold text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-blue-200">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Siap untuk Memberikan Perawatan Terbaik pada Kendaraan Anda?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Jangan tunggu lagi! Book service sekarang dan rasakan perbedaannya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
                Book Service Sekarang
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all">
                <Phone className="w-5 h-5 inline mr-2" />
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold">Kumontirinmy</span>
              </div>
              <p className="text-gray-400">
                Bengkel terpercaya dengan sistem booking online untuk kemudahan
                Anda
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Service Berkala
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Perbaikan Mesin
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Body & Paint
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Jl. Raya Bengkel No. 123</li>
                <li>Jakarta Selatan, 12345</li>
                <li>Phone: (021) 123-4567</li>
                <li>Email: info@kumontirinmy.com</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Jam Operasional</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Senin - Jumat: 08:00 - 17:00</li>
                <li>Sabtu: 08:00 - 15:00</li>
                <li>Minggu: 09:00 - 13:00</li>
                <li className="text-blue-400">Emergency: 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Kumontirinmy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
