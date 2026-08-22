<div align="center">
  <h1>🧪 AcidMind</h1>
  <p><strong>Documentación en Español</strong> ·
    <a href="../../README.md">English</a> |
    <a href="README.ko.md">한국어</a> |
    <a href="README.ja.md">日本語</a> |
    <a href="README.zh-CN.md">简体中文</a> |
    <a href="README.pt-BR.md">Português</a>
  </p>
</div>

# AcidMind

8 habilidades de crítica para agentes de programación con IA. Un router. Cero revisiones genéricas.

Cuando un agente revisa código sin lente, produce siempre el mismo párrafo tibio: elogio, tres detalles menores, un cierre vago. AcidMind lo sustituye por especialistas que responden la pregunta que realmente hiciste. Una inquietud de arquitectura recibe una revisión de arquitectura. Una funcionalidad se prueba con usuarios reales, incluidos los estados vacíos. Una app pre-lanzamiento es atacada como la atacaría un atacante real, y te la devuelven junto con un plan de hardening.

Toda revisión termina con un veredicto mecánico de una línea:

> **Gate: SHIP | FIX FIRST | DO NOT SHIP**

Las habilidades se cargan bajo demanda. Revisar código cuesta cinco archivos de contexto.

## La Familia de Habilidades

| Habilidad | Persona | Qué responde | Comando |
|---|---|---|---|
| `ruthless-critic` | 🧪 El test ácido (registros ROAST / AUTOPSY / HONEST) | ¿Dónde se rompe exactamente este artefacto? | `/grill-me`, `/autopsy`, `/tellingtruth`, `/honest` |
| `design-critic` | 🧠 El arquitecto | ¿Esta estructura sobrevivirá a los próximos tres cambios de requisito? | `/designcritic` |
| `feature-critic` | 🔪 El disector | ¿Esta funcionalidad funciona para usuarios reales, en todos los estados? | `/featurecritic` |
| `badass-critic` | 💻 El ingeniero de rendimiento | ¿Bajo qué carga cae, y medido cómo? | `/badass` |
| `security-critic` | 😠🥷 Comandante de incidentes + atacante contratado (Protocolo A simulación de desastres / Protocolo B red team) | ¿Qué podría salir fatalmente mal? ¿Cómo entraría alguien? | `/heartattack`, `/blackhat`, `/pentest` |
| `autocritic-skill` | 🎭 El auditor | ¿Este SKILL.md se activa correctamente y produce salida útil? | `/auditskill` |
| `unified-critic` | 🧩 Moderador del panel | ¿Qué dicen todas las lentes a la vez, fusionado en un solo informe? | `/acidmind` |
| `secondthought-critic` | 🤔 La pausa antes de ejecutar | **Cargado automáticamente cada sesión:** cuando afirmas una opinión o plan, lo critica antes de que el agente ejecute | automático, `/wait` |

Tres propiedades de la familia: solo lectura por defecto · alcances sin superposición · gate de propósito (nunca se prohíbe la técnica, sino la técnica sin propósito).

## Inicio Rápido

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

Actualizaciones:

```bash
npx github:ragajatsuma-cmd/acidmind status   # instalado vs más reciente
npx github:ragajatsuma-cmd/acidmind update   # actualización automática
```

## Uso Responsable

El Protocolo B de `security-critic` ataca únicamente objetivos que te pertenecen o para los que tienes permiso por escrito. Todo lo demás, lo rechaza. Describe rutas de ataque, precondiciones y defensas; no genera exploits listos para ejecutar y solo delega pruebas dinámicas a los agentes Strix/Wallbreaker instalados. Las otras 7 habilidades son herramientas de diagnóstico de solo lectura, salvo solicitud explícita de implementación.

## Licencia

MIT — ver [LICENSE](../../LICENSE).
