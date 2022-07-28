--create table if not exists products (
--	id uuid primary key default uuid_generate_v4(),
--	title text,
--	description text,
--	price int
--)

--create extension if not exists "uuid-ossp"

--drop table products

--create table if not exists stocks (
--	product_id uuid,
--	count int,
--	foreign key ("product_id") references "products" ("id")
--)

--drop table stocks

--insert into products  (title, description, price) values
--('Principles: Life and Work','Principles: Life and Work by Ray Dalio',24),
--('Stillness Is the Key','Stillness Is the Key by Ryan Holiday',10),
--('The Miracle Morning','The Miracle Morning: The Not-So-Obvious Secret Guaranteed to Transform Your Life (Before 8AM)',15),
--('The Ride of a Lifetime','The Ride of a Lifetime: Lessons Learned from 15 Years as CEO of the Walt Disney Company',23),
--('Work Rules!','Work Rules!: Insights from Inside Google That Will Transform How You Live and Lead',15),
--('Simple Rules','Simple Rules: How to Thrive in a Complex World',23),
--('The Power of Positive Leadership','The Power of Positive Leadership: How and Why Positive Leaders Transform Teams and Organizations and Change the World',15),
--('The Power of Habit','The Power of Habit: Why We Do What We Do in Life and Business',23)


--insert into stocks  (product_id, count) values
--('c56ce99e-945a-4066-b4dc-a84edbd41658',3),
--('ac3ec140-a971-4ea3-ad30-cabe63eb382f',4),
--('84a7c88a-ee32-4b60-919b-1baf067f6486',5),
--('0167d796-6d98-432e-bd56-5aa8f89686fc',6),
--('3f0cfb96-a32f-4272-b426-35238a6bb151',7),
--('04e4a4d8-1f40-4500-95c7-af18ea4a9942',2),
--('c86fa0e6-6256-40e3-a081-31d656fc70ec',4),
--('1e383352-af52-4afb-a48f-c7500c3749c6',5)


--select p.title, p.description, p.price, s.count
--from products p
--inner join
--stocks s
--on p.id = s.product_id
