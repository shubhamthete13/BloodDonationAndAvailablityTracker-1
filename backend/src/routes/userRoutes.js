// import express from "express";

// import { upload } from "../utils/multer.js";
// import {
//   signUp,
//   resizeProfileImage,
//   login,
//   getRewards,
//   getRedeemed,
//   getCampaigns,
//   getRequests,
//   getUser,
//   logout,
// } from "../controllers/userController.js";
// import { validateToken } from "../controllers/userController.js";
// import verifyToken from "../utils/verfiyToken.js";
// import { restrictTo } from "../utils/restrictionAcess.js";

// const router = express.Router();
// router.route("/").get(verifyToken, getUser);
// router
//   .route("/signup")
//   .post(upload.single("imageFile"), resizeProfileImage, signUp);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/validate-user").get(verifyToken, validateToken);

// //rewards
// router.route("/rewards").get(verifyToken, getRewards);
// router.route("/redeemed").get(verifyToken, restrictTo("Donor"), getRedeemed);

// //campaigns
// router.route("/campaigns/:history?").get(verifyToken, getCampaigns);
// router.route("/request/:history?").get(verifyToken, getRequests);
// export default router;

// import express from "express";
// import sharp from "sharp";
// import path from "path";

// import { upload } from "../utils/multer.js";
// import { getAllDonors } from "../controllers/donorControllres.js";

// import {
//   signUp,
//   login,
//   getRewards,
//   getRedeemed,
//   getCampaigns,
//   getRequests,
//   getUser,
//   logout,
//   validateToken,
// } from "../controllers/userController.js";
// // import { getAllDonors } from "../controllers/donorControllres.js";
// import verifyToken from "../utils/verfiyToken.js";
// import { restrictTo } from "../utils/restrictionAcess.js";

// const router = express.Router();

// // ✅ Get user profile (protected)
// router.route("/").get(verifyToken, getUser);

// // ✅ Signup with safe multer + sharp handling
// router
//   .route("/signup")
//   .post(
//     (req, res, next) => {
//       upload.single("imageFile")(req, res, function (err) {
//         if (err) {
//           console.error("Multer Error:", err);
//           return res.status(400).json({ error: "Image upload failed", details: err.message });
//         }
//         next();
//       });
//     },
//     async (req, res, next) => {
//       try {
//         if (!req.file) return next();
    
//         if (!req.file.mimetype.startsWith("image/")) {
//           return res.status(400).json({ error: "Uploaded file is not an image" });
//         }
    
//         const safeEmail = req.body.email.trim().replace(/[^a-zA-Z0-9@.]/g, "_");
//         req.body.profilePic = `profilePic--${Date.now()}-${safeEmail}.jpeg`;
    
//         const outputPath = path.join(process.cwd(), "public", "img", req.body.profilePic);
//         await sharp(req.file.buffer)
//           .resize(500, 500)
//           .toFormat("jpeg")
//           .jpeg({ quality: 90 })
//           .toFile(outputPath);
    
//         next();
//       } catch (err) {
//         console.error("Sharp Resize Error:", err);
//         return res.status(500).json({ error: "Failed to process image" });
//       }
//     }
//   )    
// // ✅ Login
// router.route("/login").post(login);

// // ✅ Logout
// router.route("/logout").get(logout);

// // ✅ Validate token
// router.route("/validate-user").get(verifyToken, validateToken);

// // ✅ Rewards (Donor only)
// router.route("/rewards").get(verifyToken, getRewards);
// router.route("/redeemed").get(verifyToken, restrictTo("Donor"), getRedeemed);

// // ✅ Campaigns & Requests
// router.route("/campaigns/:history?").get(verifyToken, getCampaigns);
// router.route("/request/:history?").get(verifyToken, getRequests);
// router.get("/donors", verifyToken, getAllDonors);

// export default router;

import express from "express";
import sharp from "sharp";
import path from "path";

import { upload } from "../utils/multer.js";
import { getAllDonors } from "../controllers/donorControllres.js";

import {
  signUp,
  login,
  getRewards,
  getRedeemed,
  getCampaigns,
  getRequests,
  getUser,
  logout,
  validateToken,
} from "../controllers/userController.js";

import verifyToken from "../utils/verfiyToken.js";
import { restrictTo } from "../utils/restrictionAcess.js";

const router = express.Router();

router.route("/").get(verifyToken, getUser);

router
  .route("/signup")
  .post(
    (req, res, next) => {
      upload.single("imageFile")(req, res, function (err) {
        if (err) {
          console.error("Multer Error:", err);
          return res.status(400).json({ error: "Image upload failed", details: err.message });
        }
        next();
      });
    },
    async (req, res, next) => {
      try {
        if (!req.file) return next();

        if (!req.file.mimetype.startsWith("image/")) {
          return res.status(400).json({ error: "Uploaded file is not an image" });
        }

        const safeEmail = req.body.email.trim().replace(/[^a-zA-Z0-9@.]/g, "_");
        req.body.profilePic = `profilePic--${Date.now()}-${safeEmail}.jpeg`;

        const outputPath = path.join(process.cwd(), "public", "img", req.body.profilePic);
        await sharp(req.file.buffer)
          .resize(500, 500)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(outputPath);

        next();
      } catch (err) {
        console.error("Sharp Resize Error:", err);
        return res.status(500).json({ error: "Failed to process image" });
      }
    },
    signUp
  );

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/validate-user").get(verifyToken, validateToken);

router.route("/rewards").get(verifyToken, getRewards);
router.route("/redeemed").get(verifyToken, restrictTo("Donor"), getRedeemed);

router.route("/campaigns/:history?").get(verifyToken, getCampaigns);
router.route("/request/:history?").get(verifyToken, getRequests);
router.get("/donors", verifyToken, getAllDonors);

export default router;
