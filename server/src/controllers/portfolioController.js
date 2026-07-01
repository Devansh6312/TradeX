import { getPortfolioService } from "../services/portfolioService.js";

export const getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;

    const portfolio = await getPortfolioService(userId);

    res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};