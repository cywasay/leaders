-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2026 at 03:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `leaders_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `stripe_customer_id` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `name`, `phone`, `category`, `status`, `stripe_customer_id`, `user_id`, `created_at`, `updated_at`) VALUES
(2, 'ameerhamza32106@gmail.com', 'Sajid Abbas', NULL, NULL, 'active', NULL, 26, '2026-02-03 06:07:06', '2026-02-10 01:24:53'),
(3, 'jer99901@gmail.com', 'Inam ullah khan', NULL, NULL, 'active', NULL, 25, '2026-02-04 08:40:24', '2026-02-09 07:04:44');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_01_27_051036_create_personal_access_tokens_table', 1),
(5, '2026_01_27_055007_create_onboardings_table', 1),
(6, '2026_01_28_053249_add_avatar_to_users_table', 2),
(7, '2026_01_28_054425_add_specialties_to_onboardings_table', 3),
(8, '2026_01_28_054745_add_niche_focus_to_onboardings_table', 4),
(9, '2026_01_28_055002_add_brand_style_fields_to_onboardings_table', 5),
(10, '2026_01_28_055347_add_memberships_and_cv_to_onboardings_table', 6),
(11, '2026_01_28_055957_add_crm_and_payment_to_onboardings_table', 7),
(12, '2026_01_28_060139_add_legal_compliance_fields_to_onboardings_table', 8),
(13, '2026_01_28_060323_add_extra_assets_to_onboardings_table', 9),
(14, '2026_01_28_060501_add_final_notes_fields_to_onboardings_table', 10),
(15, '2026_01_28_075154_add_role_to_users_table', 11),
(16, '2026_01_29_111121_create_onboarding_configs_table', 12),
(17, '2026_02_03_052623_add_role_specific_fields_to_onboardings_table', 13),
(18, '2026_02_03_052919_add_remaining_missing_fields_to_onboardings_table', 14),
(19, '2026_02_03_073928_create_permission_tables', 15),
(20, '2026_02_03_084823_add_category_to_users_table', 16),
(21, '2026_02_03_085800_migrate_roles_to_categories', 17),
(22, '2026_02_03_092108_create_customers_table', 18),
(23, '2026_02_04_080621_add_category_and_purchase_id_to_onboardings_table', 19);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(7, 'App\\Models\\User', 11),
(8, 'App\\Models\\User', 10),
(8, 'App\\Models\\User', 12),
(8, 'App\\Models\\User', 13),
(8, 'App\\Models\\User', 14),
(8, 'App\\Models\\User', 15),
(8, 'App\\Models\\User', 17),
(8, 'App\\Models\\User', 18),
(8, 'App\\Models\\User', 19),
(8, 'App\\Models\\User', 20),
(8, 'App\\Models\\User', 21),
(8, 'App\\Models\\User', 22),
(8, 'App\\Models\\User', 23),
(8, 'App\\Models\\User', 24),
(8, 'App\\Models\\User', 25),
(8, 'App\\Models\\User', 26);

-- --------------------------------------------------------

--
-- Table structure for table `onboardings`
--

CREATE TABLE `onboardings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `stripe_charge_id` varchar(255) DEFAULT NULL,
  `practice_name` varchar(255) DEFAULT NULL,
  `practitioner_name` varchar(255) DEFAULT NULL,
  `credentials` varchar(255) DEFAULT NULL,
  `specialties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specialties`)),
  `practice_type` varchar(255) DEFAULT NULL,
  `years_experience` varchar(255) DEFAULT NULL,
  `primary_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `regions_served` varchar(255) DEFAULT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `ideal_audience` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ideal_audience`)),
  `patient_problem` text DEFAULT NULL,
  `niche_focus` varchar(255) DEFAULT NULL,
  `brand_tone` varchar(255) DEFAULT NULL,
  `liked_websites` text DEFAULT NULL,
  `brand_colors` varchar(255) DEFAULT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `education` text DEFAULT NULL,
  `certifications` varchar(255) DEFAULT NULL,
  `board_certifications` varchar(255) DEFAULT NULL,
  `memberships` varchar(255) DEFAULT NULL,
  `awards` text DEFAULT NULL,
  `media_features` varchar(255) DEFAULT NULL,
  `cv_path` varchar(255) DEFAULT NULL,
  `short_bio` text DEFAULT NULL,
  `full_story` text DEFAULT NULL,
  `work_motivation` text DEFAULT NULL,
  `personal_mission` text DEFAULT NULL,
  `services` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`services`)),
  `testimonials` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`testimonials`)),
  `website_goals` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`website_goals`)),
  `required_pages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`required_pages`)),
  `booking_url` varchar(255) DEFAULT NULL,
  `crm_tool` varchar(255) DEFAULT NULL,
  `payment_processor` varchar(255) DEFAULT NULL,
  `patient_portal_url` varchar(255) DEFAULT NULL,
  `social_links` text DEFAULT NULL,
  `headshot_path` varchar(255) DEFAULT NULL,
  `lead_magnets_path` varchar(255) DEFAULT NULL,
  `media_logos_path` varchar(255) DEFAULT NULL,
  `other_assets_path` varchar(255) DEFAULT NULL,
  `clinic_images_path` text DEFAULT NULL,
  `hipaa_compliant` tinyint(1) NOT NULL DEFAULT 0,
  `has_privacy_policy` tinyint(1) NOT NULL DEFAULT 0,
  `has_terms` tinyint(1) NOT NULL DEFAULT 0,
  `medical_disclaimer` text DEFAULT NULL,
  `privacy_policy_type` varchar(255) DEFAULT NULL,
  `terms_condition_type` varchar(255) DEFAULT NULL,
  `final_notes` text DEFAULT NULL,
  `competitors_admired` text DEFAULT NULL,
  `deadline_expectations` varchar(255) DEFAULT NULL,
  `current_step` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `key_achievements` text DEFAULT NULL,
  `numbers_impact` text DEFAULT NULL,
  `partner_orgs` varchar(255) DEFAULT NULL,
  `grants_funding` varchar(255) DEFAULT NULL,
  `media_coverage` varchar(255) DEFAULT NULL,
  `training_programs` text DEFAULT NULL,
  `affiliations` varchar(255) DEFAULT NULL,
  `podcasts` varchar(255) DEFAULT NULL,
  `past_clients` varchar(255) DEFAULT NULL,
  `degrees` text DEFAULT NULL,
  `grants` varchar(255) DEFAULT NULL,
  `press_mentions` varchar(255) DEFAULT NULL,
  `board_roles` text DEFAULT NULL,
  `media_mentions` varchar(255) DEFAULT NULL,
  `publications` varchar(255) DEFAULT NULL,
  `speaking_engagements` varchar(255) DEFAULT NULL,
  `conferences` varchar(255) DEFAULT NULL,
  `open_source` varchar(255) DEFAULT NULL,
  `media_awards` varchar(255) DEFAULT NULL,
  `why_this_work` text DEFAULT NULL,
  `current_programs` text DEFAULT NULL,
  `past_initiatives` text DEFAULT NULL,
  `geographic_reach` varchar(255) DEFAULT NULL,
  `signature_topics` text DEFAULT NULL,
  `results_impact` text DEFAULT NULL,
  `case_studies` text DEFAULT NULL,
  `research_focus` text DEFAULT NULL,
  `ongoing_work` text DEFAULT NULL,
  `impact_statement` text DEFAULT NULL,
  `career_milestones` text DEFAULT NULL,
  `business_outcomes` text DEFAULT NULL,
  `notable_projects` text DEFAULT NULL,
  `innovation_details` text DEFAULT NULL,
  `metrics_impact` text DEFAULT NULL,
  `donation_link` varchar(255) DEFAULT NULL,
  `newsletter_signup` varchar(255) DEFAULT NULL,
  `volunteer_form` varchar(255) DEFAULT NULL,
  `event_registration` varchar(255) DEFAULT NULL,
  `google_scholar` varchar(255) DEFAULT NULL,
  `orcid` varchar(255) DEFAULT NULL,
  `research_gate` varchar(255) DEFAULT NULL,
  `demo_link` varchar(255) DEFAULT NULL,
  `github_link` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `existing_content_path` varchar(255) DEFAULT NULL,
  `public_email` varchar(255) DEFAULT NULL,
  `inquiry_types` varchar(255) DEFAULT NULL,
  `seo_keywords` varchar(255) DEFAULT NULL,
  `target_industries` varchar(255) DEFAULT NULL,
  `target_regions` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `onboardings`
--

INSERT INTO `onboardings` (`id`, `user_id`, `category`, `stripe_charge_id`, `practice_name`, `practitioner_name`, `credentials`, `specialties`, `practice_type`, `years_experience`, `primary_email`, `contact_phone`, `address`, `regions_served`, `timezone`, `ideal_audience`, `patient_problem`, `niche_focus`, `brand_tone`, `liked_websites`, `brand_colors`, `logo_path`, `education`, `certifications`, `board_certifications`, `memberships`, `awards`, `media_features`, `cv_path`, `short_bio`, `full_story`, `work_motivation`, `personal_mission`, `services`, `testimonials`, `website_goals`, `required_pages`, `booking_url`, `crm_tool`, `payment_processor`, `patient_portal_url`, `social_links`, `headshot_path`, `lead_magnets_path`, `media_logos_path`, `other_assets_path`, `clinic_images_path`, `hipaa_compliant`, `has_privacy_policy`, `has_terms`, `medical_disclaimer`, `privacy_policy_type`, `terms_condition_type`, `final_notes`, `competitors_admired`, `deadline_expectations`, `current_step`, `created_at`, `updated_at`, `key_achievements`, `numbers_impact`, `partner_orgs`, `grants_funding`, `media_coverage`, `training_programs`, `affiliations`, `podcasts`, `past_clients`, `degrees`, `grants`, `press_mentions`, `board_roles`, `media_mentions`, `publications`, `speaking_engagements`, `conferences`, `open_source`, `media_awards`, `why_this_work`, `current_programs`, `past_initiatives`, `geographic_reach`, `signature_topics`, `results_impact`, `case_studies`, `research_focus`, `ongoing_work`, `impact_statement`, `career_milestones`, `business_outcomes`, `notable_projects`, `innovation_details`, `metrics_impact`, `donation_link`, `newsletter_signup`, `volunteer_form`, `event_registration`, `google_scholar`, `orcid`, `research_gate`, `demo_link`, `github_link`, `linkedin`, `existing_content_path`, `public_email`, `inquiry_types`, `seo_keywords`, `target_industries`, `target_regions`) VALUES
(13, 25, 'healthcare', 'ch_3Sx6BzEIDGpOLhn2136jeejG_li_1Sx69REIDGpOLhn2ycKlyGRx', NULL, 'test', NULL, '[\"Wellness & Health Coaches\"]', NULL, NULL, 'gz2750114@gamil.com', '12345678910', NULL, NULL, 'test', NULL, 'test', NULL, 'Professional, Clinical & Evidence-Based', 'yest', 'gtest', 'logo/VzI0Gufy3liI82SV09GO9fjoq14uYnq2E6JVhRco.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'test', 'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 3, '2026-02-09 07:09:44', '2026-02-09 07:13:02', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 26, 'tech', 'ch_3SpRZwEIDGpOLhn203ZNP5wf_li_1SpRWzEIDGpOLhn2SgzJ0BgH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 3, '2026-02-09 07:33:08', '2026-02-09 07:33:08', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 26, 'healthcare', 'ch_3SpNxbEIDGpOLhn21oubdUxK_li_1SpMxhEIDGpOLhn2r9MiwupJ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 3, '2026-02-09 07:33:26', '2026-02-09 07:33:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 26, 'business', 'ch_3SQppFEIDGpOLhn210fpjePT_li_1SQpomEIDGpOLhn2h2UqyLPY', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 3, '2026-02-09 07:33:43', '2026-02-09 07:33:43', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `onboarding_configs`
--

CREATE TABLE `onboarding_configs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` varchar(255) NOT NULL,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`config`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `onboarding_configs`
--

INSERT INTO `onboarding_configs` (`id`, `role`, `config`, `created_at`, `updated_at`) VALUES
(1, 'healthcare', '{\"role\":\"healthcare\",\"title\":\"Practice & Brand Foundation\",\"steps\":[\"My Foundation\",\"My Story & Trust\",\"Website Features\"],\"nameLabel\":\"Practitioner Full Name *\",\"namePlaceholder\":\"e.g. Dr. Saif Ullah\",\"onboardingTitle\":\"Healthcare Onboarding\",\"sections\":{\"specialties\":{\"label\":\"Specialty \\/ Focus Area (Select all that apply)\",\"placeholder\":\"Add other specialties...\",\"options\":[\"Anxiety\",\"Depression\",\"Trauma\",\"Relationship Issues\",\"ADHD\",\"LGBTQ+\",\"Children & Adolescents\",\"Sports Psychology\",\"Eating Disorders\",\"Addiction\"]},\"practiceType\":{\"label\":\"Practice Type (Select all that apply)\",\"options\":[\"Private Practice\",\"Group Practice\",\"Online Only\",\"Hybrid\"]},\"address\":{\"label\":\"Practice Address (or \\\"Telehealth Only\\\")\",\"placeholder\":\"Full address\"},\"idealAudience\":{\"title\":\"My Ideal Audience\",\"description\":\"Describe who you help best. This helps us write better copy for your site.\",\"options\":[\"Adults\",\"Children\",\"Teens\",\"Families\",\"Corporate\",\"Other\"]}}}', '2026-01-29 06:14:09', '2026-01-29 06:14:09'),
(2, 'speaker', '{\"role\":\"speaker\",\"title\":\"Speaker\",\"steps\":[\"Speaker Roots\",\"Stage Presence\",\"Digital Platform\"],\"nameLabel\":\"Speaker Full Name *\",\"namePlaceholder\":\"e.g. John Speaker\",\"onboardingTitle\":\"Speaker Onboarding\",\"sections\":{\"specialties\":{\"label\":\"Speaking Topics (Select all that apply)\",\"placeholder\":\"Add other topics...\",\"options\":[\"Leadership\",\"Motivation\",\"Sales Strategy\",\"Digital Transformation\",\"Mental Health at Work\",\"Entrepreneurship\",\"Future of Work\",\"Diversity & Inclusion\",\"Emotional Intelligence\",\"Storytelling\"]},\"practiceType\":{\"label\":\"Speaker Type (Select all that apply)\",\"options\":[\"Keynote Speaker\",\"Workshop Facilitator\",\"Corporate Trainer\",\"Panelist\",\"Master of Ceremonies\"]},\"address\":{\"label\":\"Based In (City, State\\/Country)\",\"placeholder\":\"e.g. New York, NY\"},\"idealAudience\":{\"title\":\"My Target Audience\",\"description\":\"Describe the types of audiences or organizations you speak to. This helps us tailor your marketing copy.\",\"options\":[\"Corporate Teams\",\"HR Professionals\",\"Tech Conferences\",\"University Students\",\"Sales Teams\",\"Small Business Owners\",\"Non-Profits\",\"Industry Leaders\"]}}}', '2026-01-29 06:14:09', '2026-01-30 06:29:38');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'admin-token', 'f6972405c4eb6239048a5e4a9b5764361e89b69ad66ddf5c4c53e928e1b64d8f', '[\"*\"]', NULL, NULL, '2026-01-27 07:44:37', '2026-01-27 07:44:37'),
(2, 'App\\Models\\User', 2, 'admin-token', '6711f98faf7042a32f3429af85506c3aa30b6153dd18b1a49c27860c31df293b', '[\"*\"]', '2026-01-27 09:14:44', NULL, '2026-01-27 07:46:24', '2026-01-27 09:14:44'),
(3, 'App\\Models\\User', 2, 'admin-token', '2c6844682eb9e55cd6ae8539336a8b5dc0f87a69bc1c8cb015bebc7a5edd202f', '[\"*\"]', '2026-01-28 00:15:19', NULL, '2026-01-27 09:37:19', '2026-01-28 00:15:19'),
(4, 'App\\Models\\User', 2, 'admin-token', '4684c2a68a9955c45e556310ceff25fa13edfa46c364c67ba40d36caf7b84fe8', '[\"*\"]', '2026-01-28 02:11:28', NULL, '2026-01-28 00:18:23', '2026-01-28 02:11:28'),
(5, 'App\\Models\\User', 2, 'admin-token', 'ff36134198e38634ce4f426864a541d00f86136bbaee09daaf5109aebc2d40bf', '[\"*\"]', '2026-01-28 02:35:45', NULL, '2026-01-28 02:33:40', '2026-01-28 02:35:45'),
(6, 'App\\Models\\User', 1, 'admin-token', 'e7aa8cba4808ab03a54e994d582a0492915d486123a8822396c72f68940abb2d', '[\"*\"]', '2026-01-28 03:58:34', NULL, '2026-01-28 03:58:19', '2026-01-28 03:58:34'),
(7, 'App\\Models\\User', 2, 'admin-token', 'f528e4f8f174f8e2a34ee7e190b50415f7ebe288f23a03ef8488eca8e6b3e9c0', '[\"*\"]', '2026-01-28 04:13:34', NULL, '2026-01-28 03:59:05', '2026-01-28 04:13:34'),
(8, 'App\\Models\\User', 1, 'admin-token', '90a46b009e1573225c2c1c39b4ce277d686ae959728fd9bcb30777681ac3a548', '[\"*\"]', '2026-01-28 05:00:21', NULL, '2026-01-28 05:00:04', '2026-01-28 05:00:21'),
(9, 'App\\Models\\User', 2, 'admin-token', '2900c26d029e48bf9055a2b4f3ee199448d25a757058287a3eabe9f55f01e76a', '[\"*\"]', '2026-01-28 05:01:18', NULL, '2026-01-28 05:00:38', '2026-01-28 05:01:18'),
(10, 'App\\Models\\User', 2, 'admin-token', 'ace66443926e2546a60d39189c1c8c3cf8c6154dd3f92a8ec378c63380f0e5b2', '[\"*\"]', '2026-01-28 05:26:07', NULL, '2026-01-28 05:25:49', '2026-01-28 05:26:07'),
(11, 'App\\Models\\User', 1, 'admin-token', '0ade3216f0df925d0c7600d15fdc64fa802a7af3cfeb474b9246b5d563f07b5f', '[\"*\"]', '2026-01-28 05:27:12', NULL, '2026-01-28 05:27:03', '2026-01-28 05:27:12'),
(12, 'App\\Models\\User', 3, 'admin-token', 'c0ecdf6bd4390ca75a04dcb5eef9e8ee286e43030f95f41e19e00e14754fac85', '[\"*\"]', '2026-01-28 05:28:44', NULL, '2026-01-28 05:27:47', '2026-01-28 05:28:44'),
(13, 'App\\Models\\User', 1, 'admin-token', 'd391ed2a0c3374cc65a986387328770bef4c20e2c66b919791fea8ff14559c19', '[\"*\"]', '2026-01-28 05:30:12', NULL, '2026-01-28 05:28:55', '2026-01-28 05:30:12'),
(14, 'App\\Models\\User', 1, 'admin-token', '461a26a22dbc0235c88be28ef3e233df693240444f1f8c50a72d684f66463861', '[\"*\"]', '2026-01-28 05:58:34', NULL, '2026-01-28 05:40:54', '2026-01-28 05:58:34'),
(15, 'App\\Models\\User', 1, 'admin-token', '9bcfc56e2a038591a1be2ca453e34d0a92234abefaa00c803618c0609c930a7a', '[\"*\"]', '2026-01-28 06:17:01', NULL, '2026-01-28 05:58:50', '2026-01-28 06:17:01'),
(16, 'App\\Models\\User', 1, 'admin-token', '2e15db8e1d058b03405255b62368f27cbaa679ff4c21343d381f41606b1fe9e8', '[\"*\"]', '2026-01-28 06:19:47', NULL, '2026-01-28 06:17:20', '2026-01-28 06:19:47'),
(17, 'App\\Models\\User', 1, 'admin-token', '1e7aef7a28cc4cea655d23a5c7f9dde3eb88219eefd3a53e5ba408c7816ee1a4', '[\"*\"]', NULL, NULL, '2026-01-28 06:39:19', '2026-01-28 06:39:19'),
(18, 'App\\Models\\User', 2, 'admin-token', 'b9831c46716a9ab32ea12aef254f77269603a1be65f7697e54ff3227371844d0', '[\"*\"]', '2026-01-28 06:45:08', NULL, '2026-01-28 06:40:39', '2026-01-28 06:45:08'),
(19, 'App\\Models\\User', 2, 'admin-token', 'e37b54ecc7d3e90e49572c928c265f2d2cf37543020010e1faab93c74689c212', '[\"*\"]', '2026-01-28 07:19:51', NULL, '2026-01-28 06:45:34', '2026-01-28 07:19:51'),
(20, 'App\\Models\\User', 1, 'admin-token', 'e4f5d0f132226851fcf9a0d1e075608842892508492640bb8f510c7f0c684e77', '[\"*\"]', '2026-01-28 08:37:55', NULL, '2026-01-28 08:37:22', '2026-01-28 08:37:55'),
(21, 'App\\Models\\User', 1, 'admin-token', 'c26a1f12f52f4923edb7cebd38d2322f59aebfd25819daf86209dd2627d9b105', '[\"*\"]', '2026-01-28 08:53:41', NULL, '2026-01-28 08:53:37', '2026-01-28 08:53:41'),
(22, 'App\\Models\\User', 2, 'admin-token', '3b0b59bb03333d6fa203ffa344a2d67e81a5a02b9519f5e585665d20a088671f', '[\"*\"]', '2026-01-28 08:54:36', NULL, '2026-01-28 08:54:08', '2026-01-28 08:54:36'),
(23, 'App\\Models\\User', 1, 'admin-token', '1ee1d09ffd5d48fd79fd9f702b37d02e594335278c3da5ae6b15b148bcec3a32', '[\"*\"]', '2026-01-29 00:18:29', NULL, '2026-01-28 08:55:49', '2026-01-29 00:18:29'),
(24, 'App\\Models\\User', 1, 'admin-token', 'f4b09df53a17e6401996d09c0c84ec8e4620cdcdc27c282f786f5f1cfaf8ed54', '[\"*\"]', '2026-01-29 02:44:05', NULL, '2026-01-29 01:43:08', '2026-01-29 02:44:05'),
(25, 'App\\Models\\User', 3, 'admin-token', 'a301aa9d00c18a85c963ead3d766d4a55d7bf8a99122b5cfb394733645c5663d', '[\"*\"]', '2026-01-29 02:48:06', NULL, '2026-01-29 02:44:55', '2026-01-29 02:48:06'),
(26, 'App\\Models\\User', 3, 'admin-token', 'e6fcf851963433a293b27bfc695a7c964653d4121826f25f917b5face70132b2', '[\"*\"]', '2026-01-29 02:50:00', NULL, '2026-01-29 02:49:53', '2026-01-29 02:50:00'),
(27, 'App\\Models\\User', 2, 'admin-token', 'a2561e9d6df15007ae1b896a6579c96035893e13f0dfb0677c37122f08058623', '[\"*\"]', '2026-01-29 02:52:08', NULL, '2026-01-29 02:52:08', '2026-01-29 02:52:08'),
(28, 'App\\Models\\User', 3, 'admin-token', 'a0922fc7bb9793d0e149603b4ff2e237f99912b17d94c69dc502592cb9ddbe0a', '[\"*\"]', '2026-01-29 02:53:29', NULL, '2026-01-29 02:52:23', '2026-01-29 02:53:29'),
(29, 'App\\Models\\User', 3, 'admin-token', '59ed83a91f20a3ba20230efc70635ff4369022a31a495a31ddb15e050714756e', '[\"*\"]', '2026-01-29 03:33:45', NULL, '2026-01-29 02:54:05', '2026-01-29 03:33:45'),
(30, 'App\\Models\\User', 1, 'admin-token', 'c0290ca23565f19eb828cbbfd9bab17306a19d7d3cb367dd61853694c7aff3d9', '[\"*\"]', '2026-01-29 05:57:31', NULL, '2026-01-29 04:01:16', '2026-01-29 05:57:31'),
(31, 'App\\Models\\User', 3, 'admin-token', '5ef859a163d2317d72a1ca9d7eb55e701751629f2559ae65c72d87bda16c7505', '[\"*\"]', '2026-01-29 06:06:11', NULL, '2026-01-29 06:06:07', '2026-01-29 06:06:11'),
(32, 'App\\Models\\User', 2, 'admin-token', '7813df371bb15027c5520ce4282465e793c8e8ee17fc8d83ebfb7b7d4ac380c5', '[\"*\"]', '2026-01-29 06:06:36', NULL, '2026-01-29 06:06:33', '2026-01-29 06:06:36'),
(33, 'App\\Models\\User', 2, 'admin-token', '3c8242ad0036ba283d518e00a211e98fe7e60714a38100033bbb4c40eeb47d38', '[\"*\"]', '2026-01-29 06:57:02', NULL, '2026-01-29 06:56:51', '2026-01-29 06:57:02'),
(34, 'App\\Models\\User', 1, 'admin-token', '4bf8c9ec9b8b30b6b8824371556c45d69fe148ab5f23e51a023f6b3634608ea3', '[\"*\"]', '2026-01-29 08:03:48', NULL, '2026-01-29 07:20:45', '2026-01-29 08:03:48'),
(35, 'App\\Models\\User', 1, 'admin-token', 'b155db5bdf8c034543a4d51490c326ebbd92ecdcbe5c7582e41d167b20346f0b', '[\"*\"]', '2026-01-30 01:58:44', NULL, '2026-01-30 00:34:22', '2026-01-30 01:58:44'),
(36, 'App\\Models\\User', 1, 'admin-token', '6d3c5a5941cb47caad8e238c0f91e442d96c2c9ccb3f1e1c9ff6c48ca5b9f1f6', '[\"*\"]', '2026-01-30 02:28:29', NULL, '2026-01-30 02:17:02', '2026-01-30 02:28:29'),
(37, 'App\\Models\\User', 1, 'admin-token', 'c28206f6a8cebeeecbd74f49818fa5c01ddc8ebbdd68db1759868b8a343c7ae9', '[\"*\"]', '2026-01-30 06:29:38', NULL, '2026-01-30 04:28:10', '2026-01-30 06:29:38'),
(38, 'App\\Models\\User', 3, 'admin-token', '917ed8a814112daff2817457bb306fec41a5fcad7ab6cb9dee60dbe9dfe86c01', '[\"*\"]', '2026-01-30 06:33:19', NULL, '2026-01-30 06:29:56', '2026-01-30 06:33:19'),
(39, 'App\\Models\\User', 1, 'admin-token', 'fa2ed667d5a8ebf423c4ce874cc7d00828e241300cc37458a9ad14439f934eae', '[\"*\"]', '2026-01-30 07:00:58', NULL, '2026-01-30 06:33:54', '2026-01-30 07:00:58'),
(40, 'App\\Models\\User', 8, 'admin-token', '165eeed5bbc066df9993831a921d6e12d38047944a846cdedd73a0a60b94e05c', '[\"*\"]', '2026-01-30 08:17:09', NULL, '2026-01-30 07:23:47', '2026-01-30 08:17:09'),
(41, 'App\\Models\\User', 5, 'admin-token', 'df55bbf5baa48c40929341c25e13f5987227cea76e5dce0d1a5af92d1cd79c31', '[\"*\"]', '2026-01-30 08:45:45', NULL, '2026-01-30 08:45:41', '2026-01-30 08:45:45'),
(42, 'App\\Models\\User', 1, 'admin-token', 'ca4e5247ba0f688507d7a67e6e4020e7d5a93fecd6cc936948f7c8549c3a70bb', '[\"*\"]', '2026-01-30 08:47:26', NULL, '2026-01-30 08:46:32', '2026-01-30 08:47:26'),
(43, 'App\\Models\\User', 1, 'admin-token', '94e839ef385c59ca82becc1406f88d07cb508988f435129dbc0f5077f558c237', '[\"*\"]', '2026-01-31 00:31:44', NULL, '2026-01-31 00:31:13', '2026-01-31 00:31:44'),
(44, 'App\\Models\\User', 5, 'admin-token', '0e0b5caeeac839f3b2d578b92831d5c3a22a33dcc179c94163a6f73d186e3de5', '[\"*\"]', '2026-01-31 01:07:52', NULL, '2026-01-31 00:50:05', '2026-01-31 01:07:52'),
(45, 'App\\Models\\User', 8, 'admin-token', '599bcd47464168505a6f412d7ba8acad505547f76ffa6f46a0d90f08c5a33e90', '[\"*\"]', '2026-01-31 01:31:08', NULL, '2026-01-31 01:09:17', '2026-01-31 01:31:08'),
(46, 'App\\Models\\User', 6, 'admin-token', '949337bc78c10beb02120e548a48c6b2dc80337750beda667beca00976bb674f', '[\"*\"]', '2026-01-31 02:36:06', NULL, '2026-01-31 01:48:42', '2026-01-31 02:36:06'),
(47, 'App\\Models\\User', 1, 'admin-token', '34aee78c2b6ef671f0112c36833bd48e9601e082d52dd8ae08da48b6797c9325', '[\"*\"]', '2026-02-03 00:19:15', NULL, '2026-02-03 00:18:53', '2026-02-03 00:19:15'),
(48, 'App\\Models\\User', 9, 'admin-token', '89b616277545b180dadaaaecdeaeeef40595ba0665f4dad8824ba3632eeed850', '[\"*\"]', '2026-02-03 00:35:56', NULL, '2026-02-03 00:32:16', '2026-02-03 00:35:56'),
(49, 'App\\Models\\User', 1, 'admin-token', '70f59807735941b1e3abdab2fec2f8d90c5108e46d9d4059395e77850b9b0c72', '[\"*\"]', '2026-02-03 01:29:47', NULL, '2026-02-03 01:29:04', '2026-02-03 01:29:47'),
(50, 'App\\Models\\User', 6, 'admin-token', '91821d98e3c5af0e19fe4e3cbb331009562411385293a597a7056b63eb1d1c2e', '[\"*\"]', '2026-02-03 01:36:33', NULL, '2026-02-03 01:36:28', '2026-02-03 01:36:33'),
(51, 'App\\Models\\User', 1, 'admin-token', '55971451b8f51869426110fe20361b23feb01eef3697b809028c2f6eae19096d', '[\"*\"]', '2026-02-03 02:44:26', NULL, '2026-02-03 01:37:12', '2026-02-03 02:44:26'),
(52, 'App\\Models\\User', 1, 'admin-token', '49d2dad79bd8e188b034637186bdd53ae5454757b78536f76f844f4875d6e6c0', '[\"*\"]', NULL, NULL, '2026-02-03 03:01:02', '2026-02-03 03:01:02'),
(53, 'App\\Models\\User', 6, 'admin-token', '707da2a0e5a154446ead6a172958d5b0b6e418e0d4c9cafee3ea44ccd51daaed', '[\"*\"]', '2026-02-03 03:01:31', NULL, '2026-02-03 03:01:28', '2026-02-03 03:01:31'),
(54, 'App\\Models\\User', 1, 'admin-token', '03bc5502c8d2c5dfd915fba9a405ae5b2bfafee8c711ccadb667537c35a4eec2', '[\"*\"]', '2026-02-03 05:03:55', NULL, '2026-02-03 03:05:30', '2026-02-03 05:03:55'),
(55, 'App\\Models\\User', 2, 'admin-token', '63cc22099e4ded47c769395795d423223777d9a3524a8fbe84455f8ab09cfe51', '[\"*\"]', '2026-02-03 03:09:21', NULL, '2026-02-03 03:08:16', '2026-02-03 03:09:21'),
(56, 'App\\Models\\User', 6, 'admin-token', '80b341ea5611b0263b3cc2fc062365ec90dcd29d93029a28fa4a4a72916c4856', '[\"*\"]', '2026-02-03 03:14:11', NULL, '2026-02-03 03:14:11', '2026-02-03 03:14:11'),
(57, 'App\\Models\\User', 1, 'admin-token', '6729bdfd8d432c34e2301e689557d353e52824ee059375b3031ee14039fdd429', '[\"*\"]', '2026-02-03 05:12:03', NULL, '2026-02-03 05:09:31', '2026-02-03 05:12:03'),
(58, 'App\\Models\\User', 1, 'admin-token', '9f19dc71b7b3b629eb93401a9db13f040a68442955d17361edfdacc5d0eb84fa', '[\"*\"]', NULL, NULL, '2026-02-03 05:12:22', '2026-02-03 05:12:22'),
(59, 'App\\Models\\User', 1, 'admin-token', '378d5735ef18e4c0a552a7d8223f4cc4277a294039bc64a56061eb25d4696840', '[\"*\"]', '2026-02-03 05:15:12', NULL, '2026-02-03 05:13:08', '2026-02-03 05:15:12'),
(60, 'App\\Models\\User', 11, 'admin-token', '0dfe87d29cc6ecbf79bc1fe7a229a919b7369b027980072475b7fd33d87165e1', '[\"*\"]', '2026-02-03 06:31:11', NULL, '2026-02-03 05:20:23', '2026-02-03 06:31:11'),
(61, 'App\\Models\\User', 11, 'admin-token', '49fdb7cafa5a88b4f8b1099e8121a2c19639698007679786dda9053000eae760', '[\"*\"]', '2026-02-03 06:47:37', NULL, '2026-02-03 06:47:22', '2026-02-03 06:47:37'),
(62, 'App\\Models\\User', 11, 'admin-token', '8a017ed1b90e8b472208fad2e24d5bbaaf0419819699bcc70125699ab7169732', '[\"*\"]', '2026-02-04 01:16:27', NULL, '2026-02-04 00:52:57', '2026-02-04 01:16:27'),
(63, 'App\\Models\\User', 11, 'admin-token', '0624449be667aa6e66479b5ba04c44c27ba454e21251a1f91f0f21ef8655fa73', '[\"*\"]', '2026-02-04 01:44:03', NULL, '2026-02-04 01:30:04', '2026-02-04 01:44:03'),
(64, 'App\\Models\\User', 15, 'admin-token', '8564e72f1c6653f1319066bc66fa86b7768c72c566386b5acc1f0a1850355a75', '[\"*\"]', '2026-02-04 01:56:42', NULL, '2026-02-04 01:55:47', '2026-02-04 01:56:42'),
(65, 'App\\Models\\User', 11, 'admin-token', '9d5378eba7790afaafe481802eee44a3c9117a98cba6cd0b51e1958befb33fd6', '[\"*\"]', '2026-02-04 01:58:49', NULL, '2026-02-04 01:58:21', '2026-02-04 01:58:49'),
(66, 'App\\Models\\User', 17, 'admin-token', 'a2a8fabdc22ee8d9d87432492181eeeb9c3fe271cbcb09603ba8cec338721612', '[\"*\"]', '2026-02-04 02:00:28', NULL, '2026-02-04 01:59:05', '2026-02-04 02:00:28'),
(67, 'App\\Models\\User', 11, 'admin-token', '602c29b9c0591d0d42b310b2b21c0d7fe4408bdd85fef7325afac559ae0a9b7e', '[\"*\"]', '2026-02-04 02:32:27', NULL, '2026-02-04 02:01:13', '2026-02-04 02:32:27'),
(68, 'App\\Models\\User', 17, 'admin-token', '6c9bce0b618b293f34ff6530e53352c871cf39d32ae2f56e7fcb0f4c0cb3b1fc', '[\"*\"]', '2026-02-04 04:26:21', NULL, '2026-02-04 03:02:31', '2026-02-04 04:26:21'),
(69, 'App\\Models\\User', 11, 'admin-token', 'ee089f807ba74e4ccdf44ef8b3a118b735178a75fc499d69852c5c508b95d3ce', '[\"*\"]', '2026-02-04 04:29:05', NULL, '2026-02-04 04:26:42', '2026-02-04 04:29:05'),
(70, 'App\\Models\\User', 17, 'admin-token', '4a44a158fb02a6d386e90aea248f0746c04d4e8943aeaf115fa7cb1d706186dc', '[\"*\"]', '2026-02-04 05:13:06', NULL, '2026-02-04 04:40:00', '2026-02-04 05:13:06'),
(71, 'App\\Models\\User', 11, 'admin-token', '9ee325d07bf09f0e40f8bfdcba2439cf8dc2e93530e161e473db3f8995f3080d', '[\"*\"]', '2026-02-04 05:37:35', NULL, '2026-02-04 05:13:33', '2026-02-04 05:37:35'),
(72, 'App\\Models\\User', 17, 'admin-token', 'fc4117e3e1c8f6d6bffadca57608254aef52e15e591cad70de7cd244baeb9622', '[\"*\"]', '2026-02-04 06:08:34', NULL, '2026-02-04 06:05:11', '2026-02-04 06:08:34'),
(73, 'App\\Models\\User', 11, 'admin-token', 'fed0965654978399688ac556d71a86f771713155dc043bc7eec2a6ecdbcd9044', '[\"*\"]', '2026-02-04 06:32:45', NULL, '2026-02-04 06:09:18', '2026-02-04 06:32:45'),
(74, 'App\\Models\\User', 11, 'admin-token', 'e797dad6cde185c1dd6ff72cc229825e272095d5601a555b7ec6d5d9a8eb9657', '[\"*\"]', '2026-02-04 07:20:17', NULL, '2026-02-04 07:18:10', '2026-02-04 07:20:17'),
(75, 'App\\Models\\User', 17, 'admin-token', '99a3085f33b7d33b0e03baffedde307aac3dbf983e585a2a17577ebc47e62b15', '[\"*\"]', '2026-02-04 07:22:00', NULL, '2026-02-04 07:21:26', '2026-02-04 07:22:00'),
(76, 'App\\Models\\User', 11, 'admin-token', '168cbf40a18489f636963952f60dfdfaf0f5e0585f420c6c73076bffe3482990', '[\"*\"]', '2026-02-04 08:03:30', NULL, '2026-02-04 07:24:46', '2026-02-04 08:03:30'),
(77, 'App\\Models\\User', 11, 'admin-token', 'ec56642d55dc8fd47dcfa0a1696c964413425a3c69e3d634bdc5c29a22d83e37', '[\"*\"]', '2026-02-04 08:41:24', NULL, '2026-02-04 08:35:23', '2026-02-04 08:41:24'),
(78, 'App\\Models\\User', 19, 'admin-token', '74c36220ff35f8e3f7cb4e471dfe23ef9d74934b8f35bf322cfa043b7645c8a5', '[\"*\"]', '2026-02-04 08:42:50', NULL, '2026-02-04 08:41:56', '2026-02-04 08:42:50'),
(79, 'App\\Models\\User', 11, 'admin-token', '66a6afced894507ab56c32742ef1a4b4448571487c084dfab5f99bffbc86cbe7', '[\"*\"]', '2026-02-04 08:43:45', NULL, '2026-02-04 08:43:27', '2026-02-04 08:43:45'),
(80, 'App\\Models\\User', 19, 'admin-token', 'e4be0dc1760100add528624f452cf70f256e7b1d51260d832133d88ee121494c', '[\"*\"]', '2026-02-04 08:45:41', NULL, '2026-02-04 08:45:10', '2026-02-04 08:45:41'),
(81, 'App\\Models\\User', 11, 'admin-token', 'ec13322b1d4dd0ffea807a5313a60d544e7ee4d3815ef813f77dcde30bf6d318', '[\"*\"]', '2026-02-04 08:47:27', NULL, '2026-02-04 08:47:05', '2026-02-04 08:47:27'),
(82, 'App\\Models\\User', 11, 'admin-token', '90b6dd9f4d52016807109173f7887371e815fecb51a973e45dbe00b5a4cd9b98', '[\"*\"]', NULL, NULL, '2026-02-06 00:26:04', '2026-02-06 00:26:04'),
(83, 'App\\Models\\User', 11, 'admin-token', '84096dd3ddf6a65f001d8c20fe6c7aeb36116066d66f9242d5ca2748a1784f13', '[\"*\"]', '2026-02-06 00:54:44', NULL, '2026-02-06 00:36:02', '2026-02-06 00:54:44'),
(84, 'App\\Models\\User', 20, 'admin-token', 'f16d37296a5c6e7873b8d8048753238adb4b455d346351e3925456640b42da01', '[\"*\"]', '2026-02-06 00:57:06', NULL, '2026-02-06 00:55:07', '2026-02-06 00:57:06'),
(85, 'App\\Models\\User', 11, 'admin-token', 'bd278b83034c5996efc10350eb31d47e74949cf6301ec915dfc9902011d5edc1', '[\"*\"]', '2026-02-06 00:58:11', NULL, '2026-02-06 00:57:47', '2026-02-06 00:58:11'),
(86, 'App\\Models\\User', 21, 'admin-token', 'e558282931357320707a5098ff931d45b8198cc53582521b3f0f3d1c6a8d9d06', '[\"*\"]', '2026-02-06 00:59:05', NULL, '2026-02-06 00:58:29', '2026-02-06 00:59:05'),
(87, 'App\\Models\\User', 11, 'admin-token', 'baf3d3be1c11cbccdfd92c31f0c23f7831774361fc394de5204ebe080d1021e4', '[\"*\"]', '2026-02-06 08:33:36', NULL, '2026-02-06 01:34:54', '2026-02-06 08:33:36'),
(88, 'App\\Models\\User', 11, 'admin-token', '7bf72a6d3d514af224d72229b4b4cbcbbc9d49dae75deae27bb77b2f48bd68f0', '[\"*\"]', '2026-02-09 07:00:44', NULL, '2026-02-09 02:39:01', '2026-02-09 07:00:44'),
(89, 'App\\Models\\User', 11, 'admin-token', 'c384dc83695dfe94cf4c575a670a2394f86e13305426cd3da77aff5425a494c1', '[\"*\"]', '2026-02-09 07:03:09', NULL, '2026-02-09 07:02:40', '2026-02-09 07:03:09'),
(90, 'App\\Models\\User', 11, 'admin-token', '9c1ae93201b71963bc673f686ff29e91b68f4d1b02164a95ee5f029abd2aeabe', '[\"*\"]', '2026-02-09 07:04:48', NULL, '2026-02-09 07:04:04', '2026-02-09 07:04:48'),
(91, 'App\\Models\\User', 25, 'admin-token', '29329ac0b8e10f8b72b56aaf106b1beb007a415d8613c06c332d23bb4b0f9a12', '[\"*\"]', '2026-02-09 07:13:08', NULL, '2026-02-09 07:05:14', '2026-02-09 07:13:08'),
(92, 'App\\Models\\User', 11, 'admin-token', '49bf1c0891dbb66beaedbfbb6ceb3c6e7594b9018100037d533ddca71e3b84ba', '[\"*\"]', '2026-02-09 07:27:35', NULL, '2026-02-09 07:13:51', '2026-02-09 07:27:35'),
(93, 'App\\Models\\User', 11, 'admin-token', '865820bed5d3380d50b28b5eba181431f9b04e2c8e4ef31b8dbfd30a5af90c32', '[\"*\"]', '2026-02-09 07:32:06', NULL, '2026-02-09 07:31:28', '2026-02-09 07:32:06'),
(94, 'App\\Models\\User', 26, 'admin-token', 'd53c0b0f829382778079f0e9d0ef1bf4e9be55e08b6d021f60b5a1e7d74ef232', '[\"*\"]', '2026-02-09 07:33:51', NULL, '2026-02-09 07:32:31', '2026-02-09 07:33:51'),
(95, 'App\\Models\\User', 11, 'admin-token', '001e12c993f6da91a43eeca2e9a4809c95e77b68b0915b47b7151f72193bce41', '[\"*\"]', '2026-02-09 07:51:01', NULL, '2026-02-09 07:34:28', '2026-02-09 07:51:01'),
(96, 'App\\Models\\User', 11, 'admin-token', 'd2099c34985374ac552ecfce45615d65500c9a335dd4c65a74b76970a42d7394', '[\"*\"]', NULL, NULL, '2026-02-10 00:24:05', '2026-02-10 00:24:05'),
(97, 'App\\Models\\User', 11, 'admin-token', '216ced32080042278765e4514cb1f00bc3f834ccd2a4662e189fa6757585b872', '[\"*\"]', '2026-02-10 04:25:38', NULL, '2026-02-10 00:30:28', '2026-02-10 04:25:38');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(7, 'superadmin', 'web', '2026-02-03 02:40:38', '2026-02-03 02:40:38'),
(8, 'user', 'web', '2026-02-03 03:55:31', '2026-02-03 03:55:31');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('AIENVAZaJLrJfDPYVDiG2iINPNtbndq4wNy3v8l6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieG5MblpwNFBNOEJnWUtRYWdZUW9SQmszb2FRUjI1WUgxUkVPU3R0dyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1769577817);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `category` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `category`, `avatar`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(11, 'Exagic Superadmin', 'superadmin@leaders.com', 'superadmin', NULL, 'avatars/im17vAdJP4vAlgXlA7DLsW7wOqwzHqRv3fbrpUYA.jpg', NULL, '$2y$12$6uQT7GO3ZhgDZPkZ9yj47e7wGsQ1tWK1kv7/3b59OZJJs3zlgyBh.', NULL, '2026-02-03 05:19:14', '2026-02-10 01:25:26'),
(25, 'Inam ullah khan', 'jer99901@gmail.com', 'user', NULL, NULL, NULL, '$2y$12$WjwRPRN4UZ8tuhSgfMn75erjR9mtbqNRs40ivdLJ6pBLF.GxXNbUu', NULL, '2026-02-09 07:04:44', '2026-02-09 07:04:44'),
(26, 'Sajid Abbas', 'ameerhamza32106@gmail.com', 'user', NULL, NULL, NULL, '$2y$12$o3yX2jS0qEjHt4N1a7o18Ovsqk/lf9PIBH0zvEsnlxq83HelTXoxy', NULL, '2026-02-09 07:32:01', '2026-02-09 07:32:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`),
  ADD KEY `customers_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `onboardings`
--
ALTER TABLE `onboardings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `onboardings_user_id_foreign` (`user_id`);

--
-- Indexes for table `onboarding_configs`
--
ALTER TABLE `onboarding_configs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `onboarding_configs_role_unique` (`role`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `onboardings`
--
ALTER TABLE `onboardings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `onboarding_configs`
--
ALTER TABLE `onboarding_configs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `onboardings`
--
ALTER TABLE `onboardings`
  ADD CONSTRAINT `onboardings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
