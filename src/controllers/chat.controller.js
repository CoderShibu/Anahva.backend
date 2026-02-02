<<<<<<< HEAD
// Chat Controller
import aiService from '../services/ai.service.js';
import prisma from '../config/db.js';
import { sanitizeString, isValidMode } from '../utils/sanitize.js';

export async function sendMessage(req, res) {
    try {
        const { message, mode = 'LISTEN', allow_memory = false } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'message is required and must be a string',
            });
        }

        // Sanitize and validate
        const sanitizedMessage = sanitizeString(message, 5000);
        const validMode = isValidMode(mode) ? mode : 'LISTEN';
        const language = req.session.language || 'EN';

        if (!sanitizedMessage) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'message cannot be empty',
            });
        }

        // Generate AI response
        const aiResponse = await aiService.generateResponse(
            sanitizedMessage,
            validMode,
            language
        );

        // Get or create chat session
        let chatSession = await prisma.chatSession.findFirst({
            where: { session_id: req.sessionId },
            orderBy: { updated_at: 'desc' },
        });

        if (!chatSession) {
            chatSession = await prisma.chatSession.create({
                data: {
                    session_id: req.sessionId,
                    mode: validMode,
                },
            });
        } else {
            // Update mode if changed
            await prisma.chatSession.update({
                where: { id: chatSession.id },
                data: { mode: validMode },
            });
        }

        res.json({
            success: true,
            response: aiResponse,
            mode: validMode,
            language,
        });
    } catch (error) {
        console.error('Chat message error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to process chat message',
        });
    }
}

export async function getChatSession(req, res) {
    try {
        const chatSession = await prisma.chatSession.findFirst({
            where: { session_id: req.sessionId },
            orderBy: { updated_at: 'desc' },
        });

        res.json({
            success: true,
            chatSession: chatSession ? {
                id: chatSession.id,
                mode: chatSession.mode,
                created_at: chatSession.created_at,
                updated_at: chatSession.updated_at,
            } : null,
        });
    } catch (error) {
        console.error('Get chat session error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve chat session',
        });
    }
}

export async function updateMode(req, res) {
    try {
        const { mode } = req.body;

        if (!isValidMode(mode)) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'mode must be one of: LISTEN, REFLECT, CALM',
            });
        }

        let chatSession = await prisma.chatSession.findFirst({
            where: { session_id: req.sessionId },
            orderBy: { updated_at: 'desc' },
        });

        if (!chatSession) {
            chatSession = await prisma.chatSession.create({
                data: {
                    session_id: req.sessionId,
                    mode,
                },
            });
        } else {
            chatSession = await prisma.chatSession.update({
                where: { id: chatSession.id },
                data: { mode },
            });
        }

        res.json({
            success: true,
            chatSession: {
                id: chatSession.id,
                mode: chatSession.mode,
            },
        });
    } catch (error) {
        console.error('Update mode error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to update chat mode',
        });
    }
=======
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
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
}
