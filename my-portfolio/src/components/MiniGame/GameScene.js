// src/components/MiniGame/GameScene.js
import React, { useEffect } from "react";

const GameScene = () => {
  useEffect(() => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Player object
    const player = { x: 400, y: 550, width: 50, height: 20, speed: 7 };
    const bullets = [];
    const enemies = [];
    const enemyBullets = [];
    let score = 0;
    let gameOver = false;

    // Generate enemies
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 10; col++) {
        enemies.push({ x: 50 + col * 60, y: 50 + row * 40, width: 40, height: 30 });
      }
    }

    // Key press handling
    const keys = {};
    window.addEventListener("keydown", (e) => (keys[e.key] = true));
    window.addEventListener("keyup", (e) => (keys[e.key] = false));

    // Check collision
    const isColliding = (obj1, obj2) => {
      return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
      );
    };

    // Update game state
    const update = () => {
      if (gameOver) return;

      // Move player
      if (keys["ArrowLeft"]) player.x -= player.speed;
      if (keys["ArrowRight"]) player.x += player.speed;
      player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

      // Player shooting
      if (keys[" "]) {
        if (bullets.length === 0 || bullets[bullets.length - 1].y < player.y - 50) {
          bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 4, height: 10 });
        }
      }

      // Move bullets
      bullets.forEach((bullet, index) => {
        bullet.y -= 10;
        if (bullet.y < 0) bullets.splice(index, 1);
      });

      // Enemy movement
      enemies.forEach((enemy) => {
        enemy.x += 1;
        if (enemy.x + enemy.width > canvas.width || enemy.x < 0) {
          enemies.forEach((e) => (e.y += 10));
          enemies.forEach((e) => (e.x *= -1));
        }
      });

      // Enemy shooting
      if (Math.random() < 0.02 && enemies.length > 0) {
        const shooter = enemies[Math.floor(Math.random() * enemies.length)];
        enemyBullets.push({ x: shooter.x + shooter.width / 2, y: shooter.y, width: 4, height: 10 });
      }

      // Move enemy bullets
      enemyBullets.forEach((bullet, index) => {
        bullet.y += 5;
        if (bullet.y > canvas.height) enemyBullets.splice(index, 1);
      });

      // Check collisions
      bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
          if (isColliding(bullet, enemy)) {
            enemies.splice(enemyIndex, 1);
            bullets.splice(bulletIndex, 1);
            score += 10;
          }
        });
      });

      enemyBullets.forEach((bullet) => {
        if (isColliding(bullet, player)) {
          gameOver = true;
        }
      });

      enemies.forEach((enemy) => {
        if (isColliding(enemy, player) || enemy.y + enemy.height > canvas.height) {
          gameOver = true;
        }
      });
    };

    // Render game state
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw player
      ctx.fillStyle = "cyan";
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // Draw bullets
      ctx.fillStyle = "yellow";
      bullets.forEach((bullet) => ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height));

      // Draw enemies
      ctx.fillStyle = "red";
      enemies.forEach((enemy) => ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height));

      // Draw enemy bullets
      ctx.fillStyle = "orange";
      enemyBullets.forEach((bullet) => ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height));

      // Draw score
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${score}`, 10, 20);

      if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
      }
    };

    const gameLoop = () => {
      update();
      render();
      if (!gameOver) animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    // Cleanup
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas id="gameCanvas" width="800" height="600"></canvas>;
};

export default GameScene;