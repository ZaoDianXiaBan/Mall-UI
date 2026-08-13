-- Mall admin databases initialization
CREATE DATABASE IF NOT EXISTS nacos_config DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS seata DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS mall_auth DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS mall_user DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS mall_product DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS mall_order DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ===================== Seata =====================
USE seata;

CREATE TABLE IF NOT EXISTS global_table
(
    xid                       VARCHAR(128)  NOT NULL,
    transaction_id            BIGINT,
    status                    TINYINT       NOT NULL,
    application_id            VARCHAR(32),
    transaction_service_group VARCHAR(32),
    transaction_name          VARCHAR(128),
    timeout                   INT,
    begin_time                BIGINT,
    application_data          VARCHAR(2000),
    gmt_create                DATETIME,
    gmt_modified              DATETIME,
    PRIMARY KEY (xid),
    KEY idx_status_gmt_modified (status, gmt_modified),
    KEY idx_transaction_id (transaction_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS branch_table
(
    branch_id         BIGINT       NOT NULL,
    xid               VARCHAR(128) NOT NULL,
    transaction_id    BIGINT,
    resource_group_id VARCHAR(32),
    resource_id       VARCHAR(256),
    branch_type       VARCHAR(8),
    status            TINYINT,
    client_id         VARCHAR(64),
    application_data  VARCHAR(2000),
    gmt_create        DATETIME(6),
    gmt_modified      DATETIME(6),
    PRIMARY KEY (branch_id),
    KEY idx_xid (xid)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS lock_table
(
    row_key        VARCHAR(128) NOT NULL,
    xid            VARCHAR(128),
    transaction_id BIGINT,
    branch_id      BIGINT       NOT NULL,
    resource_id    VARCHAR(256),
    table_name     VARCHAR(32),
    pk             VARCHAR(36),
    status         TINYINT      NOT NULL DEFAULT 0,
    gmt_create     DATETIME,
    gmt_modified   DATETIME,
    PRIMARY KEY (row_key),
    KEY idx_status (status),
    KEY idx_branch_id (branch_id),
    KEY idx_xid (xid)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS distributed_lock
(
    lock_key   CHAR(20) NOT NULL,
    lock_value VARCHAR(20) NOT NULL,
    expire     BIGINT,
    PRIMARY KEY (lock_key)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT IGNORE INTO distributed_lock(lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT IGNORE INTO distributed_lock(lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT IGNORE INTO distributed_lock(lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT IGNORE INTO distributed_lock(lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);

-- ===================== Auth =====================
USE mall_auth;

CREATE TABLE IF NOT EXISTS sys_admin
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    username    VARCHAR(64)  NOT NULL UNIQUE,
    password    VARCHAR(128) NOT NULL,
    nickname    VARCHAR(128) DEFAULT NULL,
    status      TINYINT      NOT NULL DEFAULT 1 COMMENT '1启用 0禁用',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- password = admin123 (BCrypt)，启动时也会由 Auth 服务重置
INSERT INTO sys_admin(username, password, nickname, status)
VALUES ('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', '超级管理员', 1)
ON DUPLICATE KEY UPDATE nickname = VALUES(nickname);

-- ===================== User =====================
USE mall_user;

CREATE TABLE IF NOT EXISTS ums_member
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    username   VARCHAR(64) NOT NULL UNIQUE,
    nickname   VARCHAR(128) DEFAULT NULL,
    phone      VARCHAR(20) DEFAULT NULL,
    status     TINYINT     NOT NULL DEFAULT 1,
    created_at DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO ums_member(username, nickname, phone, status)
VALUES ('user001', '张三', '13800000001', 1),
       ('user002', '李四', '13800000002', 1)
ON DUPLICATE KEY UPDATE nickname = VALUES(nickname);

-- ===================== Product =====================
USE mall_product;

CREATE TABLE IF NOT EXISTS pms_product
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(128)   NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    stock       INT            NOT NULL DEFAULT 0,
    category_id BIGINT         DEFAULT NULL,
    image       VARCHAR(255)   DEFAULT NULL,
    status      TINYINT        NOT NULL DEFAULT 1 COMMENT '1上架 0下架',
    created_at  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Seata AT undo log
CREATE TABLE IF NOT EXISTS undo_log
(
    id            BIGINT       NOT NULL AUTO_INCREMENT,
    branch_id     BIGINT       NOT NULL,
    xid           VARCHAR(128) NOT NULL,
    context       VARCHAR(128) NOT NULL,
    rollback_info LONGBLOB     NOT NULL,
    log_status    INT          NOT NULL,
    log_created   DATETIME     NOT NULL,
    log_modified  DATETIME     NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY ux_undo_log (xid, branch_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO pms_product(name, price, stock, category_id, image, status)
VALUES ('轻薄旗舰智能手机', 3999.00, 100, 1, 'https://picsum.photos/seed/p1/400/400', 1),
       ('商务轻薄笔记本电脑', 6299.00, 50, 2, 'https://picsum.photos/seed/p2/400/400', 1),
       ('降噪蓝牙耳机 Pro', 899.00, 200, 1, 'https://picsum.photos/seed/p9/400/400', 1);

-- ===================== Order =====================
USE mall_order;

CREATE TABLE IF NOT EXISTS oms_order
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_no     VARCHAR(64)    NOT NULL UNIQUE,
    user_id      BIGINT         NOT NULL,
    product_id   BIGINT         NOT NULL,
    product_name VARCHAR(128)   NOT NULL,
    quantity     INT            NOT NULL,
    amount       DECIMAL(10, 2) NOT NULL,
    status       TINYINT        NOT NULL DEFAULT 0 COMMENT '0待支付 1已支付 2已取消',
    created_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS undo_log
(
    id            BIGINT       NOT NULL AUTO_INCREMENT,
    branch_id     BIGINT       NOT NULL,
    xid           VARCHAR(128) NOT NULL,
    context       VARCHAR(128) NOT NULL,
    rollback_info LONGBLOB     NOT NULL,
    log_status    INT          NOT NULL,
    log_created   DATETIME     NOT NULL,
    log_modified  DATETIME     NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY ux_undo_log (xid, branch_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
