<div align="center">
  <h1>🧪 AcidMind</h1>
  <p><strong>Documentação em Português (Brasil)</strong> ·
    <a href="../../README.md">English</a> |
    <a href="README.ko.md">한국어</a> |
    <a href="README.ja.md">日本語</a> |
    <a href="README.zh-CN.md">简体中文</a> |
    <a href="README.es.md">Español</a>
  </p>
</div>

# AcidMind

8 habilidades de crítica para agentes de codificação de IA. Um roteador. Zero avaliações genéricas.

Quando um agente revisa código sem lente, produz sempre o mesmo parágrafo morno: elogio, três detalhes menores, um fechamento vago. O AcidMind substitui isso por especialistas que respondem à pergunta que você realmente fez. Uma preocupação de arquitetura recebe uma revisão de arquitetura. Uma funcionalidade é testada com usuários reais, incluindo estados vazios. Um app pré-lançamento é atacado como um atacante real o atacaria — e devolvido com um plano de hardening.

Toda avaliação termina com um veredito mecânico de uma linha:

> **Gate: SHIP | FIX FIRST | DO NOT SHIP**

As habilidades carregam sob demanda. Revisar código custa cinco arquivos de contexto.

## A Família de Habilidades

| Habilidade | Persona | O que responde | Comando |
|---|---|---|---|
| `ruthless-critic` | 🧪 O teste ácido (registros ROAST / AUTOPSY / HONEST) | Onde exatamente este artefato quebra? | `/grill-me`, `/autopsy`, `/tellingtruth`, `/honest` |
| `design-critic` | 🧠 O arquiteto | Esta estrutura sobrevive às próximas três mudanças de requisito? | `/designcritic` |
| `feature-critic` | 🔪 O dissector | Esta funcionalidade funciona para usuários reais, em todos os estados? | `/featurecritic` |
| `badass-critic` | 💻 O engenheiro de performance | Sob qual carga isso cai, medido como? | `/badass` |
| `security-critic` | 😠🥷 Comandante de incidentes + atacante contratado (Protocolo A simulação de desastre / Protocolo B red team) | O que pode dar fatalmente errado? Como alguém invadiria? | `/heartattack`, `/blackhat`, `/pentest` |
| `autocritic-skill` | 🎭 O auditor | Este SKILL.md dispara corretamente e gera saída útil? | `/auditskill` |
| `unified-critic` | 🧩 Moderador do painel | Todas as lentes de uma vez, fundidas em um relatório? | `/acidmind` |
| `secondthought-critic` | 🤔 A pausa antes da execução | **Carregado automaticamente toda sessão:** quando você afirma uma opinião ou plano, ele critica antes do agente executar | automático, `/wait` |

Três propriedades da família: somente leitura por padrão · escopos sem sobreposição · gate de propósito (nunca proibir a técnica, e sim a técnica sem propósito).

## Início Rápido

```bash
npx github:ragajatsuma-cmd/acidmind init                    # core (5)
npx github:ragajatsuma-cmd/acidmind init --edition security # + security-critic (6)
npx github:ragajatsuma-cmd/acidmind init --all              # full (8)
```

Plugin para Claude Code:

```bash
/plugin marketplace add https://github.com/ragajatsuma-cmd/acidmind
/plugin install acidmind@acidmind
```

Atualizações:

```bash
npx github:ragajatsuma-cmd/acidmind status   # instalado vs mais recente
npx github:ragajatsuma-cmd/acidmind update   # atualização automática
```

## Uso Responsável

O Protocolo B do `security-critic` ataca apenas alvos que você possui ou tem permissão por escrito para testar. Caso contrário, recusa. Descreve caminhos de ataque, pré-condições e defesas; não produz exploits prontos para execução e só delega testes dinâmicos aos agentes Strix/Wallbreaker instalados. As outras 7 habilidades são ferramentas de diagnóstico somente leitura, salvo pedido explícito de implementação.

## Licença

MIT — veja [LICENSE](../../LICENSE).
