import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { ImageData } from '../utils/fileUtils';

export interface PoseData {
  head: { description: string };
  torso: { description: string };
  leftArm: { description: string };
  rightArm: { description: string };
  leftLeg: { description: string };
  rightLeg: { description: string };
  overall: { description: string };
}

export type ImageQuality = 'SD' | 'HD' | '4K';

export const generatePoseDescription = async (
  poseImage: ImageData
): Promise<{ formattedDescription: string; poseData: PoseData }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API key is not configured. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Analyze the provided image and generate a highly detailed, systematic JSON object describing the person's pose. 

**IMPORTANT:** You MUST ignore any text, watermarks, graphic overlays, or annotations on the image. Your analysis should focus exclusively on the human figure.

Fill out the JSON schema with precise, descriptive language to capture every nuance of the person's position, orientation, and joint angles. This structured data will be used as keypoints for pose replication.`;

  const poseImagePart = {
    inlineData: {
      data: poseImage.data,
      mimeType: poseImage.mimeType,
    },
  };

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      head: {
        type: Type.OBJECT,
        properties: { description: { type: Type.STRING, description: "Head tilt, direction of gaze, and facial expression." } },
      },
      torso: {
        type: Type.OBJECT,
        properties: { description: { type: Type.STRING, description: "Torso twist, lean (forward/backward/sideways), and overall posture." } },
      },
      leftArm: {
        type: Type.OBJECT,
        properties: { description: { type: Type.STRING, description: "Position of the left shoulder, elbow, and wrist. Hand gesture." } },
      },
      rightArm: {
        type: Type.OBJECT,
        properties: { description: { type: Type.STRING, description: "Position of the right shoulder, elbow, and wrist. Hand gesture." } },
      },
      leftLeg: {
        type: Type.OBJECT,
        properties: { description: { type: Type.STRING, description: "Position of the left hip, knee, and ankle. Foot orientation." } },
      },
      rightLeg: {
        type: Type.OBJECT,
        properties: { description: { type: Type.STRING, description: "Position of the right hip, knee, and ankle. Foot orientation." } },
      },
      overall: {
          type: Type.OBJECT,
          properties: { description: { type: Type.STRING, description: "A summary of the overall pose, including balance and distribution of weight." } },
      },
    },
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [ { text: prompt }, poseImagePart] },
    config: {
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  const responseText = response.text.trim();
  const poseData: PoseData = JSON.parse(responseText);

  // Create a human-readable formatted description for the UI
  const formattedDescription = `
- **Overall:** ${poseData.overall.description}
- **Head:** ${poseData.head.description}
- **Torso:** ${poseData.torso.description}
- **Arms:**
  - Left: ${poseData.leftArm.description}
  - Right: ${poseData.rightArm.description}
- **Legs:**
  - Left: ${poseData.leftLeg.description}
  - Right: ${poseData.rightLeg.description}
  `.trim();

  return { formattedDescription, poseData };
};


export const generatePoseImage = async (
  userImage: ImageData,
  poseImage: ImageData,
  poseDescription: string,
  poseData: PoseData,
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API key is not configured. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey });

   const prompt = `
    **Objective:** You are a master image manipulation expert. Your primary and most critical task is to meticulously edit the person in the first image (Image A) to match the pose described in the structured keypoints and shown in the second image (Image B).

    **Image Definitions:**
    *   **Image A:** The source image containing the person to be modified. You must preserve their core identity, clothing, and the background from this image.
    *   **Image B:** The visual pose reference. Its sole purpose is to provide a visual example of the pose.

    **--- PROSE DESCRIPTION (FOR CONTEXT) ---**
    ${poseDescription}
    **-----------------------------------------**

    **--- STRUCTURED POSE KEYPOINTS (GROUND TRUTH) ---**
    This JSON object provides the precise, machine-readable instructions for the pose. This is the definitive source of truth.
    \`\`\`json
    ${JSON.stringify(poseData, null, 2)}
    \`\`\`
    **---------------------------------------------------**

    **--- CRITICAL RULES ---**
    1.  **POSE TRANSFER IS THE #1 PRIORITY:** Your main objective is to change the person's pose. All other rules are secondary to this. The final image MUST show the person from Image A in the new pose.
    2.  **STRUCTURED KEYPOINTS ARE KING:** The "STRUCTURED POSE KEYPOINTS" JSON is the absolute ground truth. Use the prose description and Image B as visual aids to understand the JSON data, but the JSON is the definitive instruction for the pose, head orientation, and facial expression.
    3.  **PRESERVE PERSON A's LIKENESS:** The person's core identity (unique facial features, hair, skin tone, body type) and their clothing/accessories from Image A must be preserved. HOWEVER, you MUST change their facial expression and head orientation to match the structured keypoints. Do not let "preserving identity" prevent you from changing the pose and expression.
    4.  **HANDLE STYLE MISMATCH:** Image B might be an illustration while Image A is a photo. You must intelligently interpret the *abstract pose* from the keypoints and illustration and apply it realistically to the person in the photo (Image A).
    5.  **STRICTLY IGNORE POSE B's CONTENT:** It is FORBIDDEN to transfer any content from Image B other than the pose itself. DO NOT copy the identity, clothing, artistic style, colors, or background from Image B. The final image must have the same photorealistic style as Image A.
    6.  **PRESERVE BACKGROUND A:** The background from Image A is the only one you should use. It must be preserved and seamlessly integrated.
    7.  **ENSURE NATURAL PROPORTIONS & SHOT COMPOSITION:** The generated person must have realistic body proportions. The framing of the final image (e.g., medium shot, full-body shot) must match the framing of Image B.

    **--- INSTRUCTIONS ---**
    1.  Analyze the structured keypoints, the prose description, and Image B to understand the target pose.
    2.  Modify the person from Image A to perfectly match this target pose and expression as defined by the keypoints.
    3.  Intelligently reconstruct and outpaint any parts of the person or background from Image A that are needed to create a coherent and natural-looking final image in the new pose.
    4.  The final output must be a single, high-quality, photorealistic image. It should look like a new photograph of the person from Image A, but in the new pose.
  `;

  const userImagePart = {
    inlineData: {
      data: userImage.data,
      mimeType: userImage.mimeType,
    },
  };

  const poseImagePart = {
    inlineData: {
      data: poseImage.data,
      mimeType: poseImage.mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [userImagePart, poseImagePart, textPart],
    },
    config: {
        responseModalities: [Modality.IMAGE],
    },
  });

  if (
    response.candidates &&
    response.candidates[0].content &&
    response.candidates[0].content.parts
  ) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
  }

  throw new Error("Image generation failed. The model did not return an image.");
};