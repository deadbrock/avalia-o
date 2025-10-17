"use client";

import { motion } from "framer-motion";
import { QrCode, Download, Share2, Smartphone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useRef } from "react";

export default function QRCodePage() {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const siteUrl = "https://avaliacao-plum-seven.vercel.app/";

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "fg-services-qrcode.png";
      link.href = url;
      link.click();
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FG Services - Avaliação",
          text: "Avalie nossos serviços de limpeza",
          url: siteUrl,
        });
      } catch (err) {
        console.log("Erro ao compartilhar:", err);
      }
    } else {
      // Fallback: copiar para clipboard
      navigator.clipboard.writeText(siteUrl);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4">
          {/* Header da Página */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
              <span className="text-primary font-semibold flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                QR Code de Acesso
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-primary to-secondary bg-clip-text text-transparent">
                Acesse Via QR Code
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Escaneie o QR Code abaixo para acessar o sistema de avaliação
            </p>
          </motion.div>

          {/* QR Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="text-center">
              {/* QR Code */}
              <div
                ref={qrCodeRef}
                className="flex justify-center mb-8 p-8 bg-white rounded-2xl inline-block mx-auto"
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                    siteUrl
                  )}&bgcolor=ffffff&color=1f2937`}
                  alt="QR Code FG Services"
                  className="w-64 h-64 sm:w-80 sm:h-80"
                />
              </div>

              {/* URL */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Link de acesso:</p>
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-red-700 font-semibold text-lg break-all transition-colors"
                >
                  {siteUrl}
                </a>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" onClick={downloadQRCode}>
                  <Download className="w-5 h-5" />
                  Baixar QR Code
                </Button>
                <Button variant="secondary" onClick={shareQRCode}>
                  <Share2 className="w-5 h-5" />
                  Compartilhar
                </Button>
              </div>

              {/* Instruções */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  Como usar:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-red-700 text-white flex items-center justify-center font-bold mb-2">
                      1
                    </div>
                    <p className="text-sm text-gray-700">
                      Abra a câmera do seu celular
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-red-700 text-white flex items-center justify-center font-bold mb-2">
                      2
                    </div>
                    <p className="text-sm text-gray-700">
                      Aponte para o QR Code
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-red-700 text-white flex items-center justify-center font-bold mb-2">
                      3
                    </div>
                    <p className="text-sm text-gray-700">
                      Toque na notificação para abrir
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Cards de Informação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card hover className="h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-red-700 flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Acesso Rápido
                </h3>
                <p className="text-gray-600">
                  Escaneie o QR Code e acesse o sistema de avaliação
                  instantaneamente do seu celular.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card hover className="h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-blue-700 flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Baixe e Compartilhe
                </h3>
                <p className="text-gray-600">
                  Baixe o QR Code para imprimir ou compartilhe o link
                  diretamente com seus clientes.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

