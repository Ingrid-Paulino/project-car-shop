import { Request, Response, NextFunction } from 'express';

const updateValidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.params.id.length < 24) {
    return res.status(400)
      .json({ error: 'Id must have 24 hexadecimal characters' });
  }

  next();
};

export default updateValidate;