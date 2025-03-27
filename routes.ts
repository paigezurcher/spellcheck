import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { transformTextSchema } from "@shared/schema";
import { transformText, createHighlightedHTML, generateStats } from "@/lib/textTransformer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Transform text route
  app.post("/api/transform", async (req, res) => {
    try {
      const validation = transformTextSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid input", errors: validation.error.format() });
      }
      
      const { text } = validation.data;
      
      // Transform the text
      const transformedText = transformText(text);
      
      // Create HTML with highlights
      const highlightedHTML = createHighlightedHTML(text, transformedText);
      
      // Generate random statistics
      const stats = generateStats();
      
      // Save the essay to storage (optional)
      const essay = await storage.createEssay({
        originalText: text,
        transformedText: transformedText
      });
      
      res.json({
        originalText: text,
        transformedText,
        highlightedHTML,
        stats,
        essayId: essay.id
      });
    } catch (error) {
      console.error("Error transforming text:", error);
      res.status(500).json({ message: "Failed to transform text" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}