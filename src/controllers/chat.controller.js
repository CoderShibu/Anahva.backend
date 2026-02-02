export async function sendMessage(req, res) {
  try {
    const { message, prompt, mode } = req.body;
    const finalMessage = message || prompt;

    if (!finalMessage || typeof finalMessage !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'message or prompt is required and must be a string',
      });
    }

    const sanitizedMessage = sanitizeString(finalMessage, 5000);

    // 🔹 AUTO MODE DETECTION
    function inferMode(text) {
      const t = text.toLowerCase();

      if (
        /panic|anxious|anxiety|stress|stressed|heart racing|breath|overwhelmed|fear/i.test(t)
      ) {
        return 'CALM';
      }

      if (
        /think|thinking|confused|why|pattern|future|decision|overthinking|stuck/i.test(t)
      ) {
        return 'REFLECT';
      }

      return 'LISTEN';
    }

    // Manual mode overrides auto mode
    const finalMode = mode && isValidMode(mode)
      ? mode
      : inferMode(sanitizedMessage);

    const language = req.session?.language || 'EN';
    const sessionId = req.sessionId || req.headers['x-session-id'] || 'anonymous';

    const aiResponse = await aiService.generateResponse(
      sanitizedMessage,
      finalMode,
      language
    );

 /*   let chatSession = await prisma.chatSession.findFirst({
      where: { session_id: sessionId },
      orderBy: { updated_at: 'desc' },
    });

    if (!chatSession) {
      chatSession = await prisma.chatSession.create({
        data: {
          session_id: sessionId,
          mode: finalMode,
        },
      });
    } else {
      await prisma.chatSession.update({
        where: { id: chatSession.id },
        data: { mode: finalMode },
      });
    }*/

    res.json({
      success: true,
      response: aiResponse,
      mode: finalMode,
      language,
    });
  } catch (error) {
    console.error('Chat message error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message || 'Failed to process chat message',
    });
  }
}
