declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"000-Inbox/010-Workspace/工作总结.md": {
	id: "000-Inbox/010-Workspace/工作总结.md";
  slug: "000-inbox/010-workspace/工作总结";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"000-Inbox/040-Idea Incubator/保存下有空看.md": {
	id: "000-Inbox/040-Idea Incubator/保存下有空看.md";
  slug: "000-inbox/040-idea-incubator/保存下有空看";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/AWS re_Invent 2022.md": {
	id: "200-Learning/210-Programing/AWS re_Invent 2022.md";
  slug: "200-learning/210-programing/aws-re_invent-2022";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/CSS逻辑属性与逻辑值.md": {
	id: "200-Learning/210-Programing/CSS逻辑属性与逻辑值.md";
  slug: "200-learning/210-programing/css逻辑属性与逻辑值";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Compile Svelte in Your Head（1）.md": {
	id: "200-Learning/210-Programing/Compile Svelte in Your Head（1）.md";
  slug: "200-learning/210-programing/compile-svelte-in-your-head1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Compile Svelte in Your Head（2）.md": {
	id: "200-Learning/210-Programing/Compile Svelte in Your Head（2）.md";
  slug: "200-learning/210-programing/compile-svelte-in-your-head2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Compile Svelte in Your Head（3）.md": {
	id: "200-Learning/210-Programing/Compile Svelte in Your Head（3）.md";
  slug: "200-learning/210-programing/compile-svelte-in-your-head3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Debugging by Thinking.md": {
	id: "200-Learning/210-Programing/Debugging by Thinking.md";
  slug: "200-learning/210-programing/debugging-by-thinking";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/How to do great work.md": {
	id: "200-Learning/210-Programing/How to do great work.md";
  slug: "200-learning/210-programing/how-to-do-great-work";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/JavaScript尾后逗号.md": {
	id: "200-Learning/210-Programing/JavaScript尾后逗号.md";
  slug: "200-learning/210-programing/javascript尾后逗号";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/JavaScript的词法文法.md": {
	id: "200-Learning/210-Programing/JavaScript的词法文法.md";
  slug: "200-learning/210-programing/javascript的词法文法";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Magic of Tagged Templates Literals in JavaScript.md": {
	id: "200-Learning/210-Programing/Magic of Tagged Templates Literals in JavaScript.md";
  slug: "200-learning/210-programing/magic-of-tagged-templates-literals-in-javascript";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Optimize for Core Web Vitals.md": {
	id: "200-Learning/210-Programing/Optimize for Core Web Vitals.md";
  slug: "200-learning/210-programing/optimize-for-core-web-vitals";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Proxy & Reflect.md": {
	id: "200-Learning/210-Programing/Proxy & Reflect.md";
  slug: "200-learning/210-programing/proxy--reflect";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Reactive Web Framework.md": {
	id: "200-Learning/210-Programing/Reactive Web Framework.md";
  slug: "200-learning/210-programing/reactive-web-framework";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Rust入门之旅.md": {
	id: "200-Learning/210-Programing/Rust入门之旅.md";
  slug: "200-learning/210-programing/rust入门之旅";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Service Worker Cookbook.md": {
	id: "200-Learning/210-Programing/Service Worker Cookbook.md";
  slug: "200-learning/210-programing/service-worker-cookbook";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/Things you forgot (or never knew) because of React.md": {
	id: "200-Learning/210-Programing/Things you forgot (or never knew) because of React.md";
  slug: "200-learning/210-programing/things-you-forgot-or-never-knew-because-of-react";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/《Software Engineering at Google》.md": {
	id: "200-Learning/210-Programing/《Software Engineering at Google》.md";
  slug: "200-learning/210-programing/software-engineering-at-google";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/《冒号课堂》.md": {
	id: "200-Learning/210-Programing/《冒号课堂》.md";
  slug: "200-learning/210-programing/冒号课堂";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/《程序人生》.md": {
	id: "200-Learning/210-Programing/《程序人生》.md";
  slug: "200-learning/210-programing/程序人生";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/一些有意思的Web API.md": {
	id: "200-Learning/210-Programing/一些有意思的Web API.md";
  slug: "200-learning/210-programing/一些有意思的web-api";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/一些通用的编程知识.md": {
	id: "200-Learning/210-Programing/一些通用的编程知识.md";
  slug: "200-learning/210-programing/一些通用的编程知识";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/你不知道的JS.md": {
	id: "200-Learning/210-Programing/你不知道的JS.md";
  slug: "200-learning/210-programing/你不知道的js";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/关于Web Performance.md": {
	id: "200-Learning/210-Programing/关于Web Performance.md";
  slug: "200-learning/210-programing/关于web-performance";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/富文本编辑器相关资源.md": {
	id: "200-Learning/210-Programing/富文本编辑器相关资源.md";
  slug: "200-learning/210-programing/富文本编辑器相关资源";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/打造无缝博客搭建流程：从Obsidian到GitHub Pages.md": {
	id: "200-Learning/210-Programing/打造无缝博客搭建流程：从Obsidian到GitHub Pages.md";
  slug: "200-learning/210-programing/打造无缝博客搭建流程从obsidian到github-pages";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/浏览器中的模块预加载.md": {
	id: "200-Learning/210-Programing/浏览器中的模块预加载.md";
  slug: "200-learning/210-programing/浏览器中的模块预加载";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/浏览器中的预加载扫描器.md": {
	id: "200-Learning/210-Programing/浏览器中的预加载扫描器.md";
  slug: "200-learning/210-programing/浏览器中的预加载扫描器";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/浏览器工作原理.md": {
	id: "200-Learning/210-Programing/浏览器工作原理.md";
  slug: "200-learning/210-programing/浏览器工作原理";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/深入理解Generators.md": {
	id: "200-Learning/210-Programing/深入理解Generators.md";
  slug: "200-learning/210-programing/深入理解generators";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/算法入门.md": {
	id: "200-Learning/210-Programing/算法入门.md";
  slug: "200-learning/210-programing/算法入门";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/算法套路.md": {
	id: "200-Learning/210-Programing/算法套路.md";
  slug: "200-learning/210-programing/算法套路";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/重学CSS.md": {
	id: "200-Learning/210-Programing/重学CSS.md";
  slug: "200-learning/210-programing/重学css";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/210-Programing/随便整理的前端面试常考点.md": {
	id: "200-Learning/210-Programing/随便整理的前端面试常考点.md";
  slug: "200-learning/210-programing/随便整理的前端面试常考点";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/220-English/Blogs.md": {
	id: "200-Learning/220-English/Blogs.md";
  slug: "200-learning/220-english/blogs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/220-English/Dietcode Blog.md": {
	id: "200-Learning/220-English/Dietcode Blog.md";
  slug: "200-learning/220-english/dietcode-blog";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/220-English/Dioxus.md": {
	id: "200-Learning/220-English/Dioxus.md";
  slug: "200-learning/220-english/dioxus";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/220-English/Others.md": {
	id: "200-Learning/220-English/Others.md";
  slug: "200-learning/220-english/others";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/220-English/Serde.md": {
	id: "200-Learning/220-English/Serde.md";
  slug: "200-learning/220-english/serde";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/220-Sociology/新手管理者面临的9个问题🙋.md": {
	id: "200-Learning/220-Sociology/新手管理者面临的9个问题🙋.md";
  slug: "200-learning/220-sociology/新手管理者面临的9个问题";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"200-Learning/220-Sociology/聊聊第一性原理.md": {
	id: "200-Learning/220-Sociology/聊聊第一性原理.md";
  slug: "200-learning/220-sociology/聊聊第一性原理";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Calendar/2023 书单.md": {
	id: "Calendar/2023 书单.md";
  slug: "calendar/2023-书单";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Calendar/2023 目标.md": {
	id: "Calendar/2023 目标.md";
  slug: "calendar/2023-目标";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Calendar/Daily notes/2023-02-11.md": {
	id: "Calendar/Daily notes/2023-02-11.md";
  slug: "calendar/daily-notes/2023-02-11";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Calendar/Daily notes/2023-07-04.md": {
	id: "Calendar/Daily notes/2023-07-04.md";
  slug: "calendar/daily-notes/2023-07-04";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Calendar/Daily notes/2023-07-10.md": {
	id: "Calendar/Daily notes/2023-07-10.md";
  slug: "calendar/daily-notes/2023-07-10";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Calendar/Daily notes/2023-08-21.md": {
	id: "Calendar/Daily notes/2023-08-21.md";
  slug: "calendar/daily-notes/2023-08-21";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Calendar/Daily notes/2023-08-30.md": {
	id: "Calendar/Daily notes/2023-08-30.md";
  slug: "calendar/daily-notes/2023-08-30";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Calendar/Weekly/2023-W-6.md": {
	id: "Calendar/Weekly/2023-W-6.md";
  slug: "calendar/weekly/2023-w-6";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Extras/Daily Reading/1.md.md": {
	id: "Extras/Daily Reading/1.md.md";
  slug: "extras/daily-reading/1md";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Extras/个人资产/工作/代码库收集/GitHub.md": {
	id: "Extras/个人资产/工作/代码库收集/GitHub.md";
  slug: "extras/个人资产/工作/代码库收集/github";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Extras/个人资产/工作/学习文档/效率工具.md": {
	id: "Extras/个人资产/工作/学习文档/效率工具.md";
  slug: "extras/个人资产/工作/学习文档/效率工具";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Extras/个人资产/工作/学习文档/面试手册.md": {
	id: "Extras/个人资产/工作/学习文档/面试手册.md";
  slug: "extras/个人资产/工作/学习文档/面试手册";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Extras/个人资产/工作/富文本编辑器/ProseMirror.md": {
	id: "Extras/个人资产/工作/富文本编辑器/ProseMirror.md";
  slug: "extras/个人资产/工作/富文本编辑器/prosemirror";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Extras/个人资产/生活/买房🏠.md": {
	id: "Extras/个人资产/生活/买房🏠.md";
  slug: "extras/个人资产/生活/买房";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Extras/个人资产/生活/蜜月旅行🏝️.md": {
	id: "Extras/个人资产/生活/蜜月旅行🏝️.md";
  slug: "extras/个人资产/生活/蜜月旅行️";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Extras/个人资产/生活/驾考.md": {
	id: "Extras/个人资产/生活/驾考.md";
  slug: "extras/个人资产/生活/驾考";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"README.md": {
	id: "README.md";
  slug: "readme";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
