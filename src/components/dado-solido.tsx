import {
  corDaFace,
  valorDaRolagem,
  type FacesDado,
  type TipoDado,
} from "@/lib/dados-tipos";
import { facesVisiveis } from "@/lib/projecao";

/**
 * Um dado sólido: as faces da frente, cada uma com a própria luz, e o número
 * por cima.
 *
 * As faces vêm da mesma geometria que desenha os poliedros do fundo do hero —
 * é a projeção com descarte das faces de trás. A aresta sai da cor da face,
 * mais escura: sem ela duas faces de brilho parecido viram uma mancha só e o
 * sólido perde o facetado, que é o que se reconhece como dado.
 */
export function DadoSolido({
  tipo,
  gravado,
  className,
  style,
}: {
  tipo: TipoDado;
  gravado?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const faces = facesVisiveis(tipo.poliedro, tipo.pose[0], tipo.pose[1]);

  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      {faces.map(({ chave, pontos, luz }) => (
        <polygon
          key={chave}
          points={pontos}
          fill={corDaFace(tipo.hex, luz)}
          stroke={corDaFace(tipo.hex, luz * 0.45)}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
      ))}

      {gravado === undefined ? null : (
        <text
          x="50"
          y="52"
          textAnchor="middle"
          dominantBaseline="central"
          fill={tipo.tinta}
          fontSize={tipo.faces === 4 ? 30 : 36}
          fontWeight={700}
          fontFamily="var(--font-mono)"
        >
          {gravado}
        </text>
      )}
    </svg>
  );
}

/** O que a face vale para a soma da mesa. */
export function valorDe(faces: FacesDado, gravado: number) {
  return valorDaRolagem(faces, gravado);
}
