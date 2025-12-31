import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleGitHubSignIn, handleGoogleSignIn } from '@/lib/auth-client';

interface FormField {
	id: string;
	name: string;
	type: string;
	label: string;
	placeholder?: string;
}

interface SignFormProps {
	title: string;
	fields: Array<FormField>;
	formData: Record<string, string>;
	onSubmit: (e: React.FormEvent) => Promise<void>;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	submitButtonText: string;
	footerText: string;
	footerLinkText: string;
	footerLinkTo: string;
}

export function SignForm({
	title,
	fields,
	formData,
	onSubmit,
	onChange,
	submitButtonText,
	footerText,
	footerLinkText,
	footerLinkTo,
}: SignFormProps) {
	return (
		<div className='container mx-auto max-w-md p-8'>
			<h1 className='text-3xl font-bold mb-6'>{title}</h1>
			<form onSubmit={onSubmit} className='space-y-4'>
				{fields.map((field) => (
					<div key={field.id} className='space-y-2'>
						<label htmlFor={field.id} className='text-sm font-medium'>
							{field.label}
						</label>
						<Input
							id={field.id}
							name={field.name}
							type={field.type}
							placeholder={field.placeholder}
							value={formData[field.name]}
							onChange={onChange}
							required
						/>
					</div>
				))}

				<Button type='submit' className='w-full'>
					{submitButtonText}
				</Button>
			</form>

			<div className='mt-6'>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center'>
						<div className='w-full border-t border-gray-300' />
					</div>
					<div className='relative flex justify-center text-sm'>
						<span className='px-2 bg-background text-muted-foreground'>Or continue with</span>
					</div>
				</div>

				<div className='flex justify-center items-center gap-4 p-4'>
					<Button type='button' variant='outline' onClick={handleGoogleSignIn}>
						<img src='/google-icon.svg' alt='Google' className='w-5 h-5' />
					</Button>
					<Button type='button' variant='outline' onClick={handleGitHubSignIn}>
						<img src='/github-icon.svg' alt='GitHub' className='w-5 h-5' />
					</Button>
				</div>
			</div>

			<p className='text-center text-sm text-muted-foreground'>
				{footerText}{' '}
				<Link to={footerLinkTo} className='text-primary hover:underline font-medium'>
					{footerLinkText}
				</Link>
			</p>
		</div>
	);
}
