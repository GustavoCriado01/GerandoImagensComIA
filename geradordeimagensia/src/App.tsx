import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Wand2, Download, RefreshCw, Image as ImageIcon, Zap, ChevronRight } from 'lucide-react';

const LOADING_MESSAGES = [
    "Iniciando ignição criativa...",
    "Consultando o oráculo de pixels...",
    "Misturando tintas digitais...",
    "Calculando refração de luz e sombras...",
    "Polindo os últimos detalhes...",
    "Preparando a revelação..."
];

const INSPIRATION_CHIPS = [
    "🎨 Pintura a Óleo",
    "🤖 Cyberpunk 2077",
    "📸 Fotorrealista 8k",
    "✨ Fantasia Escura",
    "🌸 Estilo Studio Ghibli",
    "📐 Arquitetura Minimalista"
];

export default function LuminaApp() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Efeito para rotacionar as mensagens de loading
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isGenerating) {
            setLoadingMsgIndex(0);
            interval = setInterval(() => {
                setLoadingMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [isGenerating]);

    // Auto-resize do textarea
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    const addStyleToPrompt = (style: string) => {
        const cleanStyle = style.replace(/^[^\w\s]+/, '').trim(); // Remove o emoji
        const newPrompt = prompt ? `${prompt}, no estilo ${cleanStyle}` : `Uma imagem incrível no estilo ${cleanStyle}`;
        setPrompt(newPrompt);
    };

    const generateImage = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setImageUrl(null);
        setError(null);

        try {
            const response = await fetch('https://localhost:7150/api/images', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) throw new Error('Falha ao gerar imagem');
            const data = await response.json();

            setImageUrl(data.uri);

        } catch (err) {
            console.error(err);
            setError("Ops! Uma anomalia ocorreu na matriz. Tente novamente.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateImage();
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 font-sans selection:bg-purple-500/30 flex flex-col">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <main className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
                <header className="flex items-center justify-between mb-16 animate-fade-in-down">
                    <div className="flex items-center gap-2 text-white">
                        <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-xl">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-medium tracking-wide">Lumina</span>
                    </div>
                    <div className="text-xs font-mono text-neutral-500 bg-neutral-900/50 px-3 py-1.5 rounded-full border border-neutral-800">
                        v1.0.0
                    </div>
                </header>
                <div className={`transition-all duration-700 ease-in-out ${imageUrl || isGenerating ? 'transform -translate-y-4' : 'transform translate-y-12'}`}>

                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
                            O que você deseja <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">materializar</span> hoje?
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                            Descreva sua visão detalhadamente e nossa inteligência artificial transformará suas palavras em uma obra-prima visual.
                        </p>
                    </div>
                    <div className="relative group max-w-3xl mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-2 shadow-2xl transition-all focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/50">
                            <textarea
                                ref={textareaRef}
                                value={prompt}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                disabled={isGenerating}
                                placeholder="Ex: Uma floresta bioluminescente habitada por raposas de cristal, renderização 3D, Unreal Engine 5..."
                                className="w-full bg-transparent text-white placeholder-neutral-500 p-4 text-lg resize-none outline-none min-h-[60px] max-h-[200px] disabled:opacity-50 overflow-hidden"
                                rows={1}
                            />

                            <div className="flex justify-between items-center px-4 pb-2 pt-2 border-t border-neutral-800/50 mt-2">
                                <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                                    <Zap className="w-3 h-3 text-purple-400" />
                                    <span>Dica: Use "Shift + Enter" para quebrar linha</span>
                                </div>
                                <button
                                    onClick={generateImage}
                                    disabled={!prompt.trim() || isGenerating}
                                    className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                >
                                    {isGenerating ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            Gerando...
                                        </>
                                    ) : (
                                        <>
                                            Gerar Imagem
                                            <ChevronRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    {(!isGenerating && !imageUrl) && (
                        <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-3xl mx-auto animate-fade-in">
                            {INSPIRATION_CHIPS.map((chip) => (
                                <button
                                    key={chip}
                                    onClick={() => addStyleToPrompt(chip)}
                                    className="px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/30 text-neutral-300 text-sm hover:bg-neutral-800 hover:text-white transition-all hover:border-neutral-700 active:scale-95"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {error && (
                    <div className="mt-8 max-w-2xl mx-auto p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-center">
                        {error}
                    </div>
                )}
                <div className="mt-12 flex flex-col items-center justify-center w-full max-w-3xl mx-auto pb-20">

                    {isGenerating && (
                        <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl border border-neutral-800 bg-neutral-900/50 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                                    <div className="bg-neutral-800 p-4 rounded-full border border-neutral-700">
                                        <Wand2 className="w-8 h-8 text-purple-400 animate-pulse" />
                                    </div>
                                </div>

                                <p className="text-lg font-medium text-white transition-opacity duration-500 min-h-[28px]">
                                    {LOADING_MESSAGES[loadingMsgIndex]}
                                </p>
                                <div className="w-48 h-1 bg-neutral-800 rounded-full mt-6 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-full origin-left animate-[scaleX_4s_ease-in-out_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {imageUrl && !isGenerating && (
                        <div className="w-full animate-fade-in-up">
                            <div className="relative group rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
                                <img
                                    src={imageUrl}
                                    alt={prompt}
                                    className="w-full object-cover aspect-square md:aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <div className="flex items-end justify-between gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex-1">
                                            <p className="text-white font-medium line-clamp-2 text-sm md:text-base leading-relaxed text-shadow">
                                                "{prompt}"
                                            </p>
                                        </div>
                                        <a
                                            href={imageUrl}
                                            download="lumina-arte.jpg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-xl transition-colors shrink-0"
                                            title="Abrir/Baixar imagem"
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => { setImageUrl(null); setPrompt(''); }}
                                    className="text-neutral-400 hover:text-white flex items-center gap-2 text-sm transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Criar uma nova obra
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </main>
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes scaleX {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .text-shadow { text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
      `}} />
        </div>
    );
}