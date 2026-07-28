import { pool } from "../database/db";
import { generateToken } from "../utils/jwt";

export const googleLogin = async (profile: any) => {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error("Google account has no email.");
  }

  const existingUser = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  let user;

  if (existingUser.rows.length > 0) {
    user = existingUser.rows[0];

    if (!user.provider_id) {
      const updatedUser = await pool.query(
        `
        UPDATE users
        SET
          provider = 'google',
          provider_id = $1,
          avatar = COALESCE($2, avatar)
        WHERE id = $3
        RETURNING *
        `,
        [
          profile.id,
          profile.photos?.[0]?.value ?? null,
          user.id,
        ]
      );

      user = updatedUser.rows[0];
    }
  } else {
    const createdUser = await pool.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password,
        provider,
        provider_id,
        avatar,
        role
      )
      VALUES
      (
        $1,
        $2,
        '',
        'google',
        $3,
        $4,
        'Member'
      )
      RETURNING *
      `,
      [
        profile.displayName,
        email,
        profile.id,
        profile.photos?.[0]?.value ?? null,
      ]
    );

    user = createdUser.rows[0];
  }

  const token = generateToken(user.id);

  return {
    token,
    user,
  };
};

export const githubLogin = async (profile: any) => {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error("GitHub account has no public email address.");
  }

  const existingUser = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  let user;

  if (existingUser.rows.length > 0) {
    user = existingUser.rows[0];

    if (!user.provider_id) {
      const updatedUser = await pool.query(
        `
        UPDATE users
        SET
          provider = 'github',
          provider_id = $1,
          avatar = COALESCE($2, avatar)
        WHERE id = $3
        RETURNING *
        `,
        [profile.id, profile.photos?.[0]?.value ?? null, user.id]
      );

      user = updatedUser.rows[0];
    }
  } else {
    const createdUser = await pool.query(
      `
      INSERT INTO users (name, email, password, provider, provider_id, avatar, role)
      VALUES ($1, $2, '', 'github', $3, $4, 'Member')
      RETURNING *
      `,
      [
        profile.displayName || profile.username,
        email,
        profile.id,
        profile.photos?.[0]?.value ?? null,
      ]
    );

    user = createdUser.rows[0];
  }

  return {
    token: generateToken(user.id),
    user,
  };
};
