import { getDashboardService } from "../services/dashboardService.js";

export const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardService(req.user.id);

    res.status(200).json({
      success: true,
      ...data,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};