/*
  Warnings:

  - You are about to drop the column `userid` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `order` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `payment_method` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the column `orderid` on the `order_product` table. All the data in the column will be lost.
  - You are about to drop the column `productid` on the `order_product` table. All the data in the column will be lost.
  - You are about to alter the column `length` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `width` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `height` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `weight` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to drop the column `productid` on the `product_image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `district` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provice` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postal` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Order_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Order_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Product_Image` table without a default value. This is not possible if the table is not empty.
  - Made the column `first_name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_userid_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userid_fkey`;

-- DropForeignKey
ALTER TABLE `order_product` DROP FOREIGN KEY `Order_Product_orderid_fkey`;

-- DropForeignKey
ALTER TABLE `order_product` DROP FOREIGN KEY `Order_Product_productid_fkey`;

-- DropForeignKey
ALTER TABLE `product_image` DROP FOREIGN KEY `Product_Image_productid_fkey`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `userid`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `district` VARCHAR(191) NOT NULL,
    MODIFY `provice` VARCHAR(191) NOT NULL,
    MODIFY `postal` VARCHAR(191) NOT NULL,
    ALTER COLUMN `is_main` DROP DEFAULT;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `userid`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ALTER COLUMN `is_paid` DROP DEFAULT,
    MODIFY `status` ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') NOT NULL,
    MODIFY `payment_method` ENUM('COD', 'BANK_TRANSFER', 'CREDIT_CARD') NOT NULL;

-- AlterTable
ALTER TABLE `order_product` DROP COLUMN `orderid`,
    DROP COLUMN `productid`,
    ADD COLUMN `orderId` INTEGER NOT NULL,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` ALTER COLUMN `stock` DROP DEFAULT,
    MODIFY `length` VARCHAR(191) NULL,
    MODIFY `width` VARCHAR(191) NULL,
    MODIFY `height` VARCHAR(191) NULL,
    MODIFY `weight` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product_image` DROP COLUMN `productid`,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `first_name` VARCHAR(191) NOT NULL,
    MODIFY `last_name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Address_userId_key` ON `Address`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_key` ON `User`(`phone`);

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Product` ADD CONSTRAINT `Order_Product_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Product` ADD CONSTRAINT `Order_Product_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Image` ADD CONSTRAINT `Product_Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
