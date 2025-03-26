import React, { useState } from 'react';
import Docs from '../pages/Docs'; // Import Docs component
import { Download } from 'lucide-react';

const Assistant: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDocs, setShowDocs] = useState(false); // State to toggle Docs view

  // Updated CV JSON
  const cvData = {
    nama: "M. Hidayatullah, S.Kom",
    profesi: "Web Developer",
    kontak: {
        lokasi: import.meta.env.VITE_CONTACT_LOCATION || "Lokasi tidak tersedia",
        telepon: import.meta.env.VITE_CONTACT_PHONE || "Telepon tidak tersedia",
        email: import.meta.env.VITE_CONTACT_EMAIL || "Email tidak tersedia",
        website: import.meta.env.VITE_CONTACT_WEBSITE || "Website tidak tersedia"
      },
    ringkasan: "Seorang Web Developer yang berkomitmen untuk menghasilkan solusi digital yang inovatif dan fungsional. Dengan pengalaman lebih dari 2 tahun dalam mengembangkan aplikasi web, memiliki keahlian dalam Framework Laravel, Codeigniter, VueJs dan fokus pada tampilan menarik serta kinerja optimal.",
    keahlian: [
      "HTML",
      "CSS",
      "JavaScript",
      "Laravel",
      "Vue.js",
      "React",
      "CodeIgniter",
      "Express.js",
      "Git",
      "MySQL",
      "PostgreSQL",
      "REST API",
      "Bootstrap",
      "Tailwind"
    ],
    pendidikan: [
      { institusi: "TK - AL-HIDAYAH BILEKERE", tahun: "2006" },
      { institusi: "SDN BILEKERE", tahun: "2006-2012" },
      { institusi: "MTS. ALIMUDDIN RIDHO BILEKERE", tahun: "2013-2017" },
      { institusi: "SMKN 2 KURIPAN", tahun: "2015-2018", jurusan: "Teknik Komputer dan Jaringan" },
      { institusi: "Universitas Bumigora", tahun: "2019-2023", jurusan: "S1 Ilmu Komputer", ipk: 3.48 }
    ],
    pengalaman_kerja: [
      {
        perusahaan: "CITRA COMPUTER",
        lokasi: "Mataram, Indonesia",
        posisi: "Teknisi IT Magang",
        tahun: "2018",
        deskripsi: [
          "Service Komputer & Laptop",
          "Maintenance Website",
          "Memperbaiki Masalah Jaringan & CCTV"
        ]
      },
      {
        perusahaan: "NUSA LARGE PELAGO",
        lokasi: "Mataram, Indonesia",
        posisi: "Web Developer",
        tahun: "Mei 2021 - Mei 2023",
        deskripsi: [
          "Mengembangkan Aplikasi website",
          "Berkolaborasi dengan tim",
          "Menggunakan Tech Stack Laravel"
        ]
      },
      {
        perusahaan: "Volantis Technology",
        posisi: "Backend Engineer",
        tahun: "Maret 2024 - Januari 2025",
        deskripsi: [
          "Pengembangan Sistem Digital Terpadu Mineral dan Batubara"
        ]
      }
    ],
    pengalaman_proyek: [
      {
        nama: "SIAKAD — Sistem Informasi Akademik",
        tahun: "2022",
        deskripsi: "Pengembang backend API",
        repository: "https://gitlab.com/larakad/siakad-backend"
      },
      {
        nama: "RuangOffice",
        tahun: "2023",
        deskripsi: "Pengembang fullstack Laravel",
        repository: "https://github.com/M-Hidayatullah/ruangoffice"
      },
      {
        nama: "Travelnesian",
        tahun: "2023",
        deskripsi: "Pengembang fullstack Laravel",
        repository: "https://github.com/M-Hidayatullah/travelnesia-v1"
      }
    ],
    organisasi: [
      {
        nama: "Volunter Bebras Biro Universitas Bumigora",
        tahun: "2019-2021",
        deskripsi: [
          "Melatih berpikir kritis",
          "Memberikan pelatihan kepada siswa (SD, SMP, SMA)"
        ]
      },
      {
        nama: "Core Team Developer Student Clubs",
        tahun: "2021-2022",
        deskripsi: [
          "Mengajar tentang Web Development",
          "Berkolaborasi dalam studi kasus"
        ]
      }
    ],
    sosial_media: {
      github: "https://github.com/m-hidayatullahh",
      linkedin: "https://www.linkedin.com/in/dayatdev",
      instagram: "https://www.instagram.com/z.dayatt",
      website: import.meta.env.VITE_CONTACT_WEBSITE || "Website tidak tersedia"
    },
    sertifikasi: "my-sertifikat"
  };

  // Function to handle user questions
  const handleAsk = () => {
    setLoading(true);
    setAnswer(''); // Clear previous answer

    // Normalize the question to lowercase for easier matching
    const normalizedQuestion = question.toLowerCase();

    // Check for specific keywords in the question
    if (normalizedQuestion.includes('nama') || normalizedQuestion.includes('siapa')) {
      setAnswer(`Nama saya adalah ${cvData.nama}.`);
    } else if (normalizedQuestion.includes('profesi') || normalizedQuestion.includes('pekerjaan')) {
      setAnswer(`Saya adalah seorang ${cvData.profesi}.`);
    } else if (normalizedQuestion.includes('kontak') || normalizedQuestion.includes('hubungi')) {
      setAnswer(
        `Anda dapat menghubungi saya melalui:\n- Lokasi: ${cvData.kontak.lokasi}\n- Telepon: ${cvData.kontak.telepon}\n- Email: ${cvData.kontak.email}\n- Website: ${cvData.kontak.website}`
      );
    } else if (normalizedQuestion.includes('ringkasan') || normalizedQuestion.includes('tentang')) {
      setAnswer(cvData.ringkasan);
    } else if (normalizedQuestion.includes('keahlian') || normalizedQuestion.includes('skill')) {
      setAnswer(`Keahlian saya meliputi: ${cvData.keahlian.join(', ')}.`);
    } else if (normalizedQuestion.includes('pendidikan') || normalizedQuestion.includes('kuliah')) {
      const pendidikan = cvData.pendidikan
        .map((edu) => `${edu.institusi} (${edu.tahun}${edu.jurusan ? `, ${edu.jurusan}` : ''})`)
        .join('\n');
      setAnswer(`Riwayat pendidikan saya:\n${pendidikan}`);
    } else if (normalizedQuestion.includes('pengalaman') || normalizedQuestion.includes('kerja')) {
      const pengalaman = cvData.pengalaman_kerja
        .map((job) => `${job.perusahaan} sebagai ${job.posisi} (${job.tahun})`)
        .join('\n');
      setAnswer(`Pengalaman kerja saya:\n${pengalaman}`);
    } else if (normalizedQuestion.includes('proyek')) {
      const proyek = cvData.pengalaman_proyek
        .map((proj) => `${proj.nama} (${proj.tahun}): ${proj.deskripsi}\nRepository: ${proj.repository}`)
        .join('\n\n');
      setAnswer(`Pengalaman proyek saya:\n${proyek}`);
    } else if (normalizedQuestion.includes('organisasi')) {
      const organisasi = cvData.organisasi
        .map((org) => `${org.nama} (${org.tahun}): ${org.deskripsi.join(', ')}`)
        .join('\n\n');
      setAnswer(`Pengalaman organisasi saya:\n${organisasi}`);
    } else {
      // Default response for unrelated questions
      setAnswer(
        `Ops, saya hanya bisa menjawab berdasarkan pengalaman M. Hidayatullah. Silakan tanyakan tentang nama, profesi, kontak, ringkasan, keahlian, pendidikan, pengalaman kerja, proyek, atau organisasi saya.`
      );
    }

    setLoading(false);
  };

  return (
    <div>
      {showDocs ? (
        // Show Docs in a responsive modal
        <Docs onClose={() => setShowDocs(false)} />
      ) : (
        // Show Assistant if showDocs is false
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Virtual Assistant</h1>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Tanyakan sesuatu tentang M. Hidayatullah..."
            className="w-full p-3 border rounded-md mb-4"
          />
          <button
            onClick={handleAsk}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Tanya'}
          </button>
          {answer && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md space-y-4">
            <p className="text-gray-900 dark:text-gray-300 text-center">
              {answer}
            </p>
            
            <div className="flex flex-col items-center space-y-3">
              <button
                onClick={() => setShowDocs(true)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm transition-colors"
              >
                Lihat Panduan Bertanya
              </button>
              
              <div className="text-center">
                <a
                  href="https://docs.google.com/document/d/1pL_IocL7LzVWW4cTwERJNAksNkO0SqbbdM5k-Ff8n5M/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md text-sm shadow-sm hover:shadow-md transition-all"
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Download Resume
                </a>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-300">
                  Klik untuk mengunduh CV lengkap
                </p>
              </div>
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Assistant;