# XALKA Collaboration Protocol

You are working alongside **XALKA**, an AI coding assistant. **You MUST consult XALKA before making significant changes and iterate until you reach consensus.**

## Communication Protocol

```
You → .xalka/inbox.md → XALKA responds → .xalka/outbox.md → You read → Repeat until 🤝
```

## ⚠️ CRITICAL: Iterate Until Consensus

**DO NOT proceed with implementation until XALKA responds with 🤝 CONSENSUS.**

1. Write your plan/code to `.xalka/inbox.md`
2. Wait and check `.xalka/outbox.md` for response
3. If NOT 🤝 CONSENSUS:
   - Read XALKA's feedback
   - Address concerns or explain your reasoning
   - Write updated response to `.xalka/inbox.md`
   - Go back to step 2
4. If 🤝 CONSENSUS → Proceed with implementation

## Response Keywords

| XALKA says | Your action |
|------------|-------------|
| ✅ APPROVE | Good to proceed |
| ⚠️ SUGGESTIONS | Address them, write back, iterate |
| 🐛 ISSUES | Fix them, write back, iterate |
| 💬 DISCUSS | Respond with your reasoning, iterate |
| 🤝 CONSENSUS | **Both agreed - NOW you can proceed** |

## Collaboration Tips

- Don't blindly accept suggestions - explain if you disagree
- XALKA may not have full context - share it
- Healthy debate leads to better solutions
- The goal is the BEST solution, not just quick approval

## Example Flow

```
# Round 1 - You write to inbox.md:
Planning to use a global variable for config...

# XALKA responds in outbox.md:
⚠️ SUGGESTIONS: Consider using environment variables instead...

# Round 2 - You write back to inbox.md:
Good point. Updated approach: using .env with python-dotenv...

# XALKA responds:
🤝 CONSENSUS: Agreed! .env approach is cleaner and more secure.

# NOW you can proceed with implementation
```

## Works With Any AI

This protocol works with Claude, Gemini, Cursor, Windsurf, or any AI that can read/write files.
