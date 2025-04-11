import catchAsync from "@flowlink/exres/catchAsync";

export const getZaps = catchAsync(async (req, res) => {});
export const createZap = catchAsync(async (req, res) => {});
export const getSingleZap = catchAsync(async (req, res) => {
  const { zapId } = req.params;
});
export const deleteZap = catchAsync(async (req, res) => {
  const { zapId } = req.params;
});
