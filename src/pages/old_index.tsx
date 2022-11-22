import { signIn } from "next-auth/react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../common/utils/trpc";

import styles from "./index.module.css";

const Home: NextPage = () => {

	const menuItems = trpc.orders.menuItems.useQuery();
	const ings = trpc.orders.ings.useQuery({ menuItemID: 1 });

	const order = trpc.orders.order.useMutation();
	const createOrder = async () => {
		order.mutate({
			customerName: "bob",
			employeeID: 12345,
			orderItems: [{ menuItemID: 1, notes: 'asdf', ings: [101, 101] }]
		});
	};

	const updateMenuItemMutation = trpc.manager.updateMenuItem.useMutation();
	const updateMenuItem = async () => {
		updateMenuItemMutation.mutate({
			menuItemID: 1,
			name: 'fish sticks',
			description: 'do you like fish sticks',
			price: 12.00,
			isEntree: true,
			imageURL: "",
			subtype: 2,
		});
	};

	const insertMenuItemMutation = trpc.manager.insertMenuItem.useMutation();
	const insertMenuItem = async () => {
		insertMenuItemMutation.mutate({
			metaData: {
				name: "gabe",
				description: "gabe",
				price: 69.69,
				isEntree: false,
				imageURL: "asdf",
				subtype: 1
			},
			ings: [{ itemID: 101, amount: 10 }]
		});
	}

	const updateInventoryItemMutation = trpc.manager.updateInventoryItem.useMutation();
	const updateInventoryItem = async () => {
		updateInventoryItemMutation.mutate({
			itemID: 101,
			name: 'jelly',
			unitPrice: 69.69,
			expirationDate: new Date(),
			stock: 2,
			restockThreshold: 25,
		});
	}


	const insertInventoryItemMutation = trpc.manager.insertInventoryItem.useMutation();
	const insertInventoryItem = async () => {
		insertInventoryItemMutation.mutate({
			name: 'peanut butter',
			unitPrice: 69.69,
			expirationDate: new Date(),
			stock: 2,
			restockThreshold: 20,
		});
	}

	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<button onClick={insertMenuItem}>insert menuItem</button>
				<button onClick={updateMenuItem}>update menuItem</button>
				<button onClick={() => signIn()}>SIGN IN TO USE UPDATE/INSERT button</button>
				<p>{updateMenuItemMutation.error && `UPDATE ERROR: ${updateMenuItemMutation.error.message}`}</p>
				<p>{insertMenuItemMutation.error && `INSERT ERROR: ${insertMenuItemMutation.error.message}`}</p>
				<div><pre>{ings.data && JSON.stringify(ings.data, null, '\t')}</pre></div>
				<div><pre>{menuItems.data && JSON.stringify(menuItems.data, null, '\t')}</pre></div>
			</div>
		</>
	);
};

export default Home;

type TechnologyCardProps = {
	name: string;
	description: string;
	documentation: string;
};

const TechnologyCard = ({
	name,
	description,
	documentation,
}: TechnologyCardProps) => {
	return (
		<section className={styles.card}>
			<h2 className={styles.cardTitle}>{name}</h2>
			<p className={styles.cardDescription}>{description}</p>
			<Link
				className={styles.cardDocumentation}
				href={documentation}
				target="_blank"
				rel="noreferrer"
			>
				Documentation
			</Link>
		</section>
	);
};
