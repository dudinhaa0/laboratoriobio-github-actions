import React, { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default function LaboratorioBioApp() {
  const [dataUrlLamina, setDataUrlLamina] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('Pronto para registrar uma lâmina.');

  const capturarLamina = async () => {
    setCarregando(true);
    setMensagem('Abrindo a câmera...');
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        width: 1600,
        correctOrientation: true,
      });

      if (!image.dataUrl) {
        throw new Error('A câmera não retornou uma imagem.');
      }

      setDataUrlLamina(image.dataUrl);
      setMensagem('Imagem da lâmina capturada com sucesso.');
    } catch (error) {
      const detalhe = String(error?.message || error || 'Operação cancelada');
      if (/cancel|canceled|cancelled/i.test(detalhe)) {
        setMensagem('Captura cancelada. Você pode tentar novamente.');
      } else {
        console.error('Erro ao fotografar a lâmina:', error);
        setMensagem('Não foi possível abrir a câmera. Confira as permissões e tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.headerIcon} aria-hidden="true">🔬</div>
        <p style={styles.eyebrow}>LABORATÓRIO BIOLÓGICO</p>
        <h1 style={styles.title}>Análise de Lâminas</h1>
        <p style={styles.description}>
          Registre imagens de lâminas de microscópio para consultar durante seu relatório de análise.
        </p>

        <button type="button" onClick={capturarLamina} disabled={carregando} style={{ ...styles.button, ...(carregando ? styles.buttonDisabled : {}) }}>
          {carregando ? 'Abrindo câmera...' : '📷 Fotografar Amostra'}
        </button>
        <p role="status" aria-live="polite" style={styles.status}>{mensagem}</p>

        {dataUrlLamina && (
          <div style={styles.result}>
            <h2 style={styles.resultTitle}>Lâmina registrada</h2>
            <img src={dataUrlLamina} alt="Imagem capturada da lâmina de microscópio" style={styles.image} />
            <p style={styles.caption}>A imagem foi carregada nesta tela e está pronta para consulta.</p>
            <a href={dataUrlLamina} download="lamina-laboratorio.png" style={styles.download}>Salvar imagem</a>
          </div>
        )}
      </section>
      <footer style={styles.footer}>Laboratório Bio · Registro de amostras</footer>
    </main>
  );
}

const styles = {
  page: { minHeight: '100vh', boxSizing: 'border-box', padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg, #ecfdf5 0%, #f8fafc 52%, #eff6ff 100%)', fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#0f172a' },
  card: { width: '100%', maxWidth: '520px', boxSizing: 'border-box', padding: '28px', borderRadius: '24px', background: '#ffffff', border: '1px solid #dbeafe', boxShadow: '0 18px 50px rgba(15, 23, 42, 0.10)' },
  headerIcon: { width: '64px', height: '64px', display: 'grid', placeItems: 'center', borderRadius: '18px', background: '#dcfce7', fontSize: '32px', marginBottom: '20px' },
  eyebrow: { margin: '0 0 8px', color: '#15803d', fontSize: '12px', fontWeight: 800, letterSpacing: '1.8px' },
  title: { margin: '0', fontSize: 'clamp(26px, 6vw, 34px)', lineHeight: 1.15, letterSpacing: '-0.8px' },
  description: { margin: '14px 0 24px', color: '#64748b', lineHeight: 1.65, fontSize: '15px' },
  button: { width: '100%', border: 0, borderRadius: '12px', padding: '15px 18px', background: '#dc2626', color: '#ffffff', fontSize: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 18px rgba(220, 38, 38, 0.18)' },
  buttonDisabled: { opacity: 0.65, cursor: 'wait' },
  status: { minHeight: '22px', margin: '14px 0 0', color: '#475569', fontSize: '13px', lineHeight: 1.5 },
  result: { marginTop: '24px', paddingTop: '22px', borderTop: '1px solid #e2e8f0' },
  resultTitle: { margin: '0 0 12px', fontSize: '18px', fontWeight: 800 },
  image: { display: 'block', width: '100%', maxHeight: '360px', objectFit: 'contain', background: '#f1f5f9', borderRadius: '14px', border: '1px solid #e2e8f0' },
  caption: { margin: '10px 0 14px', color: '#64748b', fontSize: '13px', lineHeight: 1.5 },
  download: { display: 'inline-block', padding: '10px 14px', borderRadius: '10px', background: '#166534', color: '#ffffff', fontWeight: 700, fontSize: '13px', textDecoration: 'none' },
  footer: { marginTop: '18px', color: '#64748b', fontSize: '12px', textAlign: 'center' },
};
